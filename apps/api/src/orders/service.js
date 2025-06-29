import {BaseRepo} from "../../../../packages/utils/database/baseRepository";


const feedbackRepo = new BaseRepo("feedbacks",process.env.NEXT_PUBLIC_RESTAURANT_ID )
const orderRepo = new BaseRepo("orders",process.env.NEXT_PUBLIC_RESTAURANT_ID )

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
      orderRepo.findAll({filters, joins, search, range}),
      orderRepo.countByGroup('status', "preparing", {filters,searchKey, searchTerm}),
      orderRepo.countByGroup('status', "ready", {filters,searchKey,searchTerm})
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
  return orderRepo.findById(orderId, joins)
}

export async function getOrderFeedback(orderId){
  const filters = {order_id : orderId}
  const count = true;
  return feedbackRepo.findAll({filters, count})
}