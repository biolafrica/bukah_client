import { z } from "zod";

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

const rangeString = z
.string()
.default('0,9')   
.refine((s) => /^\d+,\d+$/.test(s), {
  message: 'range must be two integers, e.g. "0,9"',
})


export const getUsersQuerySchema = z.object({
  searchTerm: z.string().optional().default(''),
  branchId: z.string().optional().default(''),
  isActive: z.string().optional(),
  role: z.enum(
    [
      'admin',
      'supervisor',
      'waiter',
      'chef',
      'bartender',
      'sales',
    ]
  ).optional(),
  range: rangeString
})
.transform(
  (obj) =>{
    const [start, end] = obj.range.split(',').map((n) => parseInt(n, 10))
    return {
      searchTerm: obj.searchTerm,
      branchId:   obj.branchId,
      role:       obj.role,
      isActive: obj.isActive,
      range: [start, end],
    }
  }
)
.refine(
  (q) =>
    Number.isInteger(q.range[0]) &&
    Number.isInteger(q.range[1]) &&
    q.range[0] >= 0 &&
    q.range[1] > q.range[0],
  {
    message: 'range values must be non-negative integers with end > start',
    path: ['range'],
  }
)

