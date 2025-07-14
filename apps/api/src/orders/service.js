import { repos } from "../lib/repos";

export async function getAllOrders({
  searchTerm = "",
  branch = null,
  status = null,
  channel = null,
  dateRange = null,
  range = [0,9],
  orderNumber = null,
  price = null
}={}){
  const filters = {}
  const orderBy = {}

  if (branch) filters.branch_id = branch
  if (status) filters.status = status
  if (channel) filters.order_channel = channel
  if (dateRange) {
    filters.placed_at = { start: dateRange.start, end: dateRange.end }
  }
  if(orderNumber)orderBy.order_code = orderNumber
  if(price)orderBy.total_amount = price

  const joins = {
    branch: 'branches(name)',
    customer: 'customers(name)',
    accepted_by: 'users(first_name)', 
  }

  const  search = searchTerm ? ['order_code', searchTerm] : []


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
