import {BaseRepo} from "../../../../packages/utils/database/baseRepository"

export const repos = {

  feedback : new BaseRepo(
    "feedbacks",
    process.env.NEXT_PUBLIC_RESTAURANT_ID 
  ),

  order : new BaseRepo(
    "orders",
    process.env.NEXT_PUBLIC_RESTAURANT_ID 
  ),

  branch : new BaseRepo(
    "branches",
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  customer : new BaseRepo(
    "customers", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  order : new BaseRepo(
    "orders", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID 
  ),

  orderItems : new BaseRepo(
    "order_items", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID 
  ),

  feedback : new BaseRepo(
    "feedbacks", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID 
  ),

  product : new BaseRepo(
    "products", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  component : new BaseRepo(
    "product_components",
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  option : new BaseRepo(
    "product_component_option",
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  transaction : new BaseRepo(
    "transactions", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  user : new BaseRepo(
    "users",
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  session : new BaseRepo(
    "user_sessions", 
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  ),

  productCategory : new BaseRepo(
    "product_categories",
    process.env.NEXT_PUBLIC_RESTAURANT_ID
  )


}















