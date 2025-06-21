import {z} from "zod";

//schema for creating a branch 
export const createBranchSchema = z.object({
  restaurant_id: z.string().uuid("Invalid restaurant ID"),
  name: z.string().min(1, "Branch name is required"),
  address: z.string().min(2, "Branch address is required"),
  phone: z
    .string()
    .length(11, "Phone must be exactly 11 digits")
    .regex(/^\d+$/, "Phone can only contain digits"),
  offers_pickup: z.boolean(),
  pickup_charge: z.number().positive("Pickup charge must be > 0").optional(),
  offers_eatin: z.boolean(),
  eatin_charge: z.number().positive("Eat-in charge must be > 0").optional(),
  is_active: z.boolean(),
})
.refine(
  (data) =>
    data.offers_pickup ? typeof data.pickup_charge === 'number' : true,
  { message: "pickup charge is required when offer pickup is true", path: ['pickup_charge'] }
)
.refine(
  (data) =>
    data.offers_eatin ? typeof data.eatin_charge === 'number' : true,
  { message: "eatin charge is required when offers eatin is true", path: ['eatin_charge'] }
)


//schema for updating a branch (partial but at least one field)
export const updateBranchSchema = createBranchSchema
.partial()
.refine((obj) => Object.keys(obj).length > 0, {
  message: "At least one field must be provided",
})


const rangeString = z
.string()
.default('0,9')   
.refine((s) => /^\d+,\d+$/.test(s), {
  message: 'range must be two integers, e.g. "0,9"',
})

//schema for querying branches 
export const getBranchesQuerySchema = z.object({
  searchTerm: z.string().optional().default(''),
  range: rangeString,
})
.transform(
  (obj) =>{
    const [start, end] = obj.range.split(',').map((n) => parseInt(n, 10))
    return {
      searchTerm: obj.searchTerm,
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



