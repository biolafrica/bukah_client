import { startOfDay } from "date-fns";
import { repos } from "../lib/repos"
import { buildWindows } from "../lib/windows";

export function getAllCustomersWithCounts({
  searchTerm = "", 
  type = null, 
  dateRange = null, 
  range=[0,9],
  totalOrders = null,
  totalSpent = null,
}={}){
  const filters = {};
  const orderBy = {};

  if (type === 'registered') filters.is_registered = true
  if (type === 'guest') filters.is_registered = false
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  if(totalOrders) orderBy.total_orders = totalOrders;
  if(totalSpent) orderBy.total_spent = totalSpent;
  console.log("taotal",  orderBy)

  const search = searchTerm ? ['name', searchTerm] : [];

  return repos.customer.findAll({search, filters, range, orderBy})
}


export async function getAllTopCustomers(){
  const range = [0,4]
  const ordersOrderBy = {"total_orders": false}
  const spendersOrderBy = {"total_spent": false}
  try {
    const topOrders = await repos.customer.findAll({
      range, 
      orderBy:ordersOrderBy
    })

    const topSpenders = await repos.customer.findAll({
      range, 
      orderBy:spendersOrderBy
    })

    return {
      most_orders: topOrders,
      top_spenders: topSpenders
    }
    
  } catch (err) {
    throw new Error(`Error fetching top users: ${err.message}`)
  }
}

export async function getCustomerById(customerId){
  return repos.customer.findById(customerId)
}

export async function getCustomerFeedbacks(customerId, { 
  range =[0,9]
}={}){

  const filters = {customer_id : customerId}
  return repos.feedback.findAll({filters, range})
}

export async function getCustomerOrders(customerId,{ 
  range =[0,9]
}={}){

  const filters = {customer_id : customerId}
  return repos.order.findAll({filters, range})
}

export async function getCustomerMetrics() {
  const todayStart = startOfDay(new Date())
  const windows    = buildWindows(todayStart)

  const result = {
    'All Customers': {},
    'Registered':    {},
    'Guests':        {}
  }

  for (const [key, { current, previous }] of Object.entries(windows)) {
    result['All Customers'][key] = {
      current:  await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: current
      }),
      previous: await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: previous
      })
    }

    result['Registered'][key] = {
      current:  await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: current,
        filters:   { is_registered: true }
      }),
      previous: await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: previous,
        filters:   { is_registered: true }
      })
    }

    result['Guests'][key] = {
      current:  await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: current,
        filters:   { is_registered: false }
      }),
      previous: await repos.customer.countRows({
        table:     'customers',
        dateField: 'created_at',
        dateRange: previous,
        filters:   { is_registered: false }
      })
    }
  }

  return result
}
