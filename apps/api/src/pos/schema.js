import { z } from "zod";

export const createPOSSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  branch_id : z.string().uuid("Invalid branch ID"),
  name: z.string().min(1, "pos name is required"),
  account_name: z.string().min(1, "account name is required"),
  account_number: z
  .string()
  .length(10, "account number must be exactly 10 digits")
  .regex(/^\d+$/, "account number can only contain digits"),
  pos_provider: z.string().min(1, "pos bank name is required"),
})

export const updatePOSSchema = createPOSSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})