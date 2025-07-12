import { z } from "zod";
import { makeQuerySchema } from "../lib/queryBuilder";

export const createUserSchema = z.object({
  restaurant_id:   z.string().uuid("Invalid Restaurant ID"),
  first_name:   z.string().min(1, "First name is required"),
  last_name:   z.string().min(1, "Last name is required"),
  phone_number: z
  .string()
  .length(11)
  .regex(/^\d+$/, "Phone can only contain digits"),
  email:   z.string().email("Invalid email"),
  role:   z.enum([
    "admin",
    "supervisor", 
    "waiter", 
    "chef", 
    "bartender", 
    "sales" 
  ], "Invalid Role"),
  branch_id:   z.string().uuid("Invalid Restaurant ID"),
  is_active:   z.boolean(),
})

export const updateUserSchema = createUserSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})

const userFields={
  searchTerm: z.string().optional().default(''),
  branchId: z.string().optional(),
  isActive: z.string().optional(),
  name: z.string().optional(),
  role: z.enum([
    'admin',
    'supervisor',
    'waiter',
    'chef',
    'bartender',
    'sales',
  ]).optional(),

}

export const getUsersQuerySchema = makeQuerySchema(userFields)