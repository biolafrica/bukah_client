import { z } from "zod";

export const createTerminalSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  branch_id : z.string().uuid("Invalid branch ID"),
  name: z.string().min(1, "terminal name is required"),
  ip_address: z.number().positive(1, "ip address is required"),
})

export const updateTerminalSchema = createTerminalSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})