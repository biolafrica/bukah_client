import { z } from "zod";

export const createPlanSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  plan_id : z.string().uuid("Invalid plan ID"),
  status: z.string().min(1, "status vaue is required"),
})

export const updatePlanSchema = createPlanSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})