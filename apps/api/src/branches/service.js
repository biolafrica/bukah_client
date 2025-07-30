import { repos } from "../lib/repos";
import { startOfDay, subDays } from 'date-fns';
import { buildWindows } from "../lib/windows";

export async function getAllBranches({
  range = [0, 9] 
}={}){
  const select = ("name, id")

  return repos.branch.findAll({range, select})
}

export async function getAllBranchesWithSupervisor({ 
  searchTerm = '', 
  range = [0, 9] 
}={}){
  const search = searchTerm ? ['name', searchTerm] : []

  return repos.branch.findAll({search, range})
}

export async function getBranchById(branchId){
  const  joins = { branch: 'users(first_name,last_name, id)'}

  return repos.branch.findById(branchId, joins)
}

export async function createBranch(data){
  return repos.branch.create(data)
}

export async function updateBranch(branchId, data){
  return repos.branch.update(branchId, data)
}

export async function deleteBranch(branchId){
  return repos.branch.delete(branchId)
}

export async function deactivateBranch(branchId){
  return repos.branch.deactivate(branchId)
}

export async function activateBranch(branchId){
  return repos.branch.reactivate(branchId)
}


export async function getBranchMetrics({ branchId = null } = {}) {
  const todayStart = startOfDay(new Date());

  const buildWindow = (daysBack) => ({
    current: {
      from: subDays(todayStart, daysBack),
      to: subDays(todayStart, -1), // inclusive today
    },
    previous: {
      from: subDays(todayStart, daysBack * 2),
      to: subDays(todayStart, daysBack),
    }
  });

  const windows = {
    today: buildWindow(0),
    last7: buildWindow(7),
    last30: buildWindow(30)
  };

  const result = {
    'Transactions': {},
    'Orders':       {},
    'Customers':    {}
  };

  // Helper to build filter object conditionally
  const maybeFilter = (field, value) => (value != null ? { [field]: value } : {});

  for (const [key, { current, previous }] of Object.entries(windows)) {
    const txFilters = maybeFilter('branch_id', branchId);

    const totalCurrentTx = await repos.transaction.sumColumn({
      table: 'transactions',
      column: 'total_amount',
      dateRange: current,
      filters: txFilters
    });

    const totalPreviousTx = await repos.transaction.sumColumn({
      table: 'transactions',
      column: 'total_amount',
      dateRange: previous,
      filters: txFilters
    });

    result['Transactions'][key] = {
      current: totalCurrentTx,
      previous: totalPreviousTx
    };

    const orderFilters = maybeFilter('branch_id', branchId);

    const totalCurrentOrders = await repos.order.countRows({
      table: 'orders',
      dateField: 'placed_at',
      dateRange: current,
      filters: orderFilters
    });

    const totalPreviousOrders = await repos.order.countRows({
      table: 'orders',
      dateField: 'placed_at',
      dateRange: previous,
      filters: orderFilters
    });

    result['Orders'][key] = {
      current: totalCurrentOrders,
      previous: totalPreviousOrders
    };

    const customerFilters = maybeFilter('branch_id', branchId);

    const totalCurrentCustomers = await repos.customer.countRows({
      table: 'customers',
      dateField: 'created_at',
      dateRange: current,
      filters: customerFilters
    });

    const totalPreviousCustomers = await repos.customer.countRows({
      table: 'customers',
      dateField: 'created_at',
      dateRange: previous,
      filters: customerFilters
    });

    result['Customers'][key] = {
      current: totalCurrentCustomers,
      previous: totalPreviousCustomers
    };
  }

  return result;
}


export async function getBranchTotals(branchId) {
  try {
    const [totalTransactionAmount, orderCount, customerCount] = await Promise.all([
      repos.transaction.sumColumn({
        table: 'transactions',
        column: 'total_amount',
        filters: { branch_id: branchId }
      }),
      repos.order.countRows({
        table: 'orders',
        filters: { branch_id: branchId }
      }),
      repos.customer.countRows({
        table: 'customers',
        filters: { branch_id: branchId }
      })
    ]);

    return {
      transactions:totalTransactionAmount,
      orders: orderCount,
      customers: customerCount
    };
    
  } catch (error) {
    console.error("Failed to fetch branch totals:", error);
    throw error;
  }
}



