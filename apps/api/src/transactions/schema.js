import { z } from "zod"
import { makeQuerySchema } from "../lib/queryBuilder"

const transactionFields = {
  searchId : z.string().optional(), 
  branch : z.string().uuid().optional(), 
  type : z.enum(["successful", "refund", "pending"]).optional(), 
  method: z.enum(["cash", "transfer", "card"]).optional(), 
}


export const getTransactionQuerySchema = makeQuerySchema(transactionFields, {withDateRange : true})