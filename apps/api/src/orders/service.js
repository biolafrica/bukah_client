import { startOfDay } from "date-fns";
import { repos } from "../lib/repos";
import { buildWindows } from "../lib/windows";

export async function getAllOrders({
  searchTerm = "",
  branch = null,
  status = null,
  channel = null,
  dateRange = null,
  user=null,
  range = [0,9],
  orderNumber = null,
  price = null
}={}){
  const filters = {}
  const orderBy = {}

  if (branch) filters.branch_id = branch;
  if (status) filters.status = status;
  if (channel) filters.order_channel = channel;
  if (user) filters.accepted_by = user;
  if (dateRange) {
    filters.placed_at = { start: dateRange.start, end: dateRange.end }
  };
  if(orderNumber)orderBy.order_code = orderNumber;
  if(price)orderBy.total_amount = price;

  const joins = {
    branch: 'branches(name)',
    customer: 'customers(name, is_registered, email, phone)',
    accepted: 'users(first_name)', 
    processed_by: 'users(first_name)', 
  };

  const  search = searchTerm ? ['order_code', searchTerm] : [];


  return repos.order.findAll({filters, joins, search, range, orderBy})
 
}

export async function getOrderbyId(orderId){
  const joins = {
    branch: 'branches(name)',
    customer: 'customers(name)',
    accepted_by: 'users(first_name)', 
  }
  return repos.order.findById(orderId, joins)
}

export async function getOrderFeedback(orderId){
  const filters = {order_id : orderId}
  const count = true;
  return repos.feedback.findAll({filters, count})
}

export async function getOrderMetrics() {
  const todayStart = startOfDay(new Date())
  const windows    = buildWindows(todayStart)

  const result = {
    'Total Orders':   {},
    'Completed':      {},
    'Preparing':      {},
    'Cancelled':      {}
  }

  for (const [key, { current, previous }] of Object.entries(windows)) {
    result['Total Orders'][key]  = {
      current:  await repos.order.countRows({
        table:     'orders',
        dateField: 'placed_at',
        dateRange: current
      }),
      previous: await repos.order.countRows({
        table:     'orders',
        dateField: 'placed_at',
        dateRange: previous
      })
    }

    for (const status of ['completed','preparing','cancelled']) {
      result[status[0].toUpperCase() + status.slice(1)][key] = {
        current:  await repos.order.countRows({
          table:     'orders',
          dateField: 'placed_at',
          dateRange: current,
          filters:   { status }
        }),
        previous: await repos.order.countRows({
          table:     'orders',
          dateField: 'placed_at',
          dateRange: previous,
          filters:   { status }
        })
      }
    }
  }

  return result
}

