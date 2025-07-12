import { z } from "zod"
import { makeQuerySchema } from "../lib/queryBuilder"

const orderFields ={
  searchTerm : z.string().optional().default(""),
  orderNumber : z.string().optional(),
  price : z.string().optional(),
  branchId : z.string().uuid().optional(),
  status : z.enum([
    "pending",
    "accepted", 
    "preparing", 
    "ready", 
    "served", 
    "cancelled",
    "completed"
  ]).optional(),
  channel : z.enum([
    "online", 
    "instore", 
  ]).optional(),
}


export const getOrdersQuerySchema = makeQuerySchema( orderFields, {withDateRange : true})