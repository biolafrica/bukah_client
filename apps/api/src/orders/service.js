import {OrderRepository} from "../../../../packages/utils/database/orderRepository";
import {BaseRepository} from "../../../../packages/utils/database/baseRepository";

const repo = new OrderRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)
const feedbackRepo = new BaseRepository("feedbacks",process.env.NEXT_PUBLIC_RESTAURANT_ID )

export async function getAllOrders({
  searchTerm = "",
  branchId = null,
  status = null,
  channel = null,
  dateRange = null,
  range = [0,9]
}){
  return repo.findAllWithFK({searchTerm, branchId,status,channel,dateRange, range})
}


export async function getOrderbyId(orderId){
  return repo.findWithFKById(orderId)
}


export async function getOrderFeedback(orderId){
  const filters = {order_id : orderId}
  const count = true;
  return feedbackRepo.findAll({filters, count})
}