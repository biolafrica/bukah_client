import { repos } from "../lib/repos";

export async function getAllOrders({
  searchTerm = "",
  branchId = null,
  status = null,
  channel = null,
  dateRange = null,
  range = [0,9]
}={}){
  const filters = {}

  if (branchId) filters.branch_id = branchId
  if (status) filters.status = status
  if (channel) filters.order_channel = channel
  if (dateRange) {
    filters.placed_at = { start: dateRange.start, end: dateRange.end }
  }

  const joins = {
    branch: 'branches(name)',
    customer: 'customers(name)',
    accepted_by: 'users(first_name)', 
  }

  const  search = searchTerm ? ['order_code', searchTerm] : []
  const searchKey = 'order_code'

  try {
    const [
      { data, count },
      processingCounts,
      completedCounts 
    ] = await Promise.all([
      repos.order.findAll({filters, joins, search, range}),
      repos.order.countByGroup('status', "preparing", {filters,searchKey, searchTerm}),
      repos.order.countByGroup('status', "ready", {filters,searchKey,searchTerm})
    ])


    const stats = {
      total_order: count,
      processing_order: processingCounts,
      completed_order: completedCounts,
      cancelled_order: count - (processingCounts + completedCounts),
    }

    return {data, count, stats }
    
  } catch (error) {
    throw new Error(`Error fetching customer and counts: ${err.message}`)
  }
 
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