import { repos } from "../lib/repos"

export function getOrderAllOrderItems({
  orderId = null,
  range =[0,99]
}){
  const filters = {}
  if(orderId)filters.order_id = orderId

  const joins = {
    product: 'products(name, image_url)',
  }

  return repos.orderItems.findAll({filters,range,joins})

}