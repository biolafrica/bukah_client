import { z } from "zod"
import { makeQuerySchema } from "../lib/queryBuilder"

const orderFields ={
  searchTerm : z.string().optional().default(""),
  branchId : z.string().uuid().optional(),
  status : z.enum([
    "pending",
    "accepted", 
    "preparing", 
    "ready", 
    "served", 
    "cancelled", 
    "refunded"
  ]).optional(),
  channel : z.enum([
    "web", 
    "waiter", 
    "qr"
  ]).optional(),
}


export const getOrdersQuerySchema = makeQuerySchema( orderFields, {withDateRange : true})