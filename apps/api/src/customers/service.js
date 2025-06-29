import {BaseRepo} from "../../../../packages/utils/database/baseRepository"

const repo = new BaseRepo("customers", process.env.NEXT_PUBLIC_RESTAURANT_ID)
const orderRepo = new BaseRepo("orders", process.env.NEXT_PUBLIC_RESTAURANT_ID )
const feedbackRepo = new BaseRepo("feedbacks", process.env.NEXT_PUBLIC_RESTAURANT_ID )


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
    const { data, count } = await repo.findAll({search, filters, range})

    const registeredCounts = await repo.countByGroup('is_registered', true, {filters, searchKey, searchTerm})

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
    const topOrders = await repo.findAll({
      range, 
      orderBy:ordersOrderBy
    })

    const topSpenders = await repo.findAll({
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
  return repo.findById(customerId)
}

export async function getCustomerFeedbacks(customerId, { 
  range =[0,9]
}={}){

  const filters = {customer_id : customerId}
  return feedbackRepo.findAll({filters, range})
}

export async function getCustomerOrders(customerId, { 
  range =[0,9]
}={}){

  const filters = {customer_id : customerId}
  return orderRepo.findAll({filters, range})
}

//web
export async function editCustomerDetails({}){
  return repo.update()
}