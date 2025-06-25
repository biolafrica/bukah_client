import { z } from "zod";

export const createTableSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  branch_id : z.string().uuid("Invalid branch ID"),
  name: z.string().min(1, "table name is required"),
  type: z.string().min(1, "table type is required"),
  service_charge: z.number().positive("service charge must be > 0"),
  is_active: z.boolean()

})

export const updateTableSchema = createTableSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})