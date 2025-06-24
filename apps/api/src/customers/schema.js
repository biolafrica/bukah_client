import { z } from "zod";
import { makeQuerySchema } from "../lib/queryBuilder";

export const createCustomerSchema = z.object({
  restaurant_id: z.string().uuid("Invalid restaurant ID"),
  name: z.string().min(1, "Customer name is required"),
  email:   z.string().email("Invalid email"),
  phone: z  
  .string()
  .length(11, "Phone must be exactly 11 digits")
  .regex(/^\d+$/, "Phone can only contain digits")
  .optional(),
  is_registered:  z.boolean(),
  total_spent:  z.number().positive("total spent must be > 0").optional(),
  total_orders: z.number().positive("total order must be > 0").optional(),

})

export const updateCustomerSchema = createCustomerSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})

const customerFields = {
  searchTerm: z.string().optional().default(''),
  type:       z.string().optional(),
}


export const getCustomersQuerySchema = makeQuerySchema(customerFields, {withDateRange : true})


