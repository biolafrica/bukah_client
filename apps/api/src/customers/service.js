import { repos } from "../lib/repos"

export async function getAllCustomersWithCounts({
  searchTerm = "", 
  type = null, 
  dateRange = null, 
  range=[0,9]
}={}){
  const filters = {}
  if (type === 'registered') filters.is_registered = true
  if (type === 'guest') filters.is_registered = false
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  const search = searchTerm ? ['name', searchTerm] : [];
  const searchKey = 'name'

  try {
    const { data, count } = await repos.customer.findAll({search, filters, range})

    const registeredCounts = await repos.customer.countByGroup('is_registered', true, {filters, searchKey, searchTerm})

    const stats = {
      total_customers: count,
      registered_customers: registeredCounts,
      guest_customers: count - registeredCounts
    }

    return { data, count, stats }
    
  } catch (err) {
    throw new Error(`Error fetching customer with counts: ${err.message}`)
  }
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
    
  } catch (error) {
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
