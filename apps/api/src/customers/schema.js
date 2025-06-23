import { z } from "zod";

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


// 1) your existing rangeString
const rangeString = z
.string()
.default('0,9')
.refine((s) => /^\d+,\d+$/.test(s), {
  message: 'range must be two integers, e.g. "0,9"',
})

// 2) the optional dateRangeSchema we defined earlier
const dateRangeTuple = z
.string()
.refine(
  (s) => /^\d{4}-\d{2}-\d{2},\d{4}-\d{2}-\d{2}$/.test(s),
  {
    message:
    'dateRange must be two dates in YYYY-MM-DD format, e.g. "2025-06-01,2025-06-30"',
  }
)
.transform((s) => {
  const [startStr, endStr] = s.split(',')
  return [new Date(startStr), new Date(endStr)]
})
.refine(
  ([start, end]) => !isNaN(start.getTime()) && !isNaN(end.getTime()),
  { message: 'One or both dates are invalid' }
)
.refine(
  ([start, end]) => start <= end,
  { message: 'Start date must be before or equal to end date' }
)

export const dateRangeSchema = z
.union([dateRangeTuple, z.null()])
.default(null)

// 3) updated getCustomersQuerySchema
export const getCustomersQuerySchema = z
.object({
  searchTerm: z.string().optional().default(''),
  type:       z.string().optional(),
  range:      rangeString,
  dateRange:  dateRangeSchema,    // ← optional [Date,Date] or null
})
.transform((obj) => {
  const [start, end] = obj.range.split(',').map((n) => parseInt(n, 10))
  return {
    searchTerm: obj.searchTerm,
    type:       obj.type,
    range:      [start, end],
    dateRange:  obj.dateRange,       // carries over your [Date,Date] or null
  }
})
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
