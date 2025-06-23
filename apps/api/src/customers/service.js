import {CustomerRepository} from "../../../../packages/utils/database/customerRepository"
import {BaseRepository} from "../../../../packages/utils/database/baseRepository"

const repo = new CustomerRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)
const orderRepo = new BaseRepository("orders", process.env.NEXT_PUBLIC_RESTAURANT_ID )
const feedbackRepo = new BaseRepository("feedbacks", process.env.NEXT_PUBLIC_RESTAURANT_ID )

export async function getAllCustomersWithCounts({searchTerm = "", type = null, dateRange = null, range=[0,9]}){
  return repo.findAllWithCounts({searchTerm, type, dateRange,range})
}

export async function getAllTopCustomers(){
  return repo.getTopCustomers()
}

export async function getCustomerById(customerId){
  return repo.findById(customerId)
}

export async function getCustomerFeedbacks({filters = {customer_id : customerId}, count = true}){
  return feedbackRepo.findAll({filters, count})
}

export async function getCustomerOrders({filters = {customer_id : customerId}, count = true}){
  return orderRepo.findAll({filters, count})
}

export async function editCustomerDetails({}){
  return repo.update()
}