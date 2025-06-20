import {z} from "zod";

//schema for creating a branch 
export const createBranchSchema = z.object({
  restaurantId: z.string().uuid("Invalid restaurant ID"),
  name: z.string().min(1, "Branch name is required"),
  address: z.string().min(2, "Branch address is required"),
  phone: z
    .string()
    .length(11, "Phone must be exactly 11 digits")
    .regex(/^\d+$/, "Phone can only contain digits"),
  offersPickup: z.boolean(),
  pickupCharge: z.number().positive("Pickup charge must be > 0").optional(),
  offersEatIn: z.boolean(),
  eatInCharge: z.number().positive("Eat-in charge must be > 0").optional(),
  isActive: z.boolean(),
})
.refine(
  (data) =>
    data.offersPickup ? typeof data.pickupCharge === 'number' : true,
  { message: "pickupCharge is required when offersPickup is true", path: ['pickupCharge'] }
)
.refine(
  (data) =>
    data.offersEatIn ? typeof data.eatInCharge === 'number' : true,
  { message: "eatInCharge is required when offersEatIn is true", path: ['eatInCharge'] }
)


//schema for updating a branch (partial but at least one field)
export const updateBranchSchema = createBranchSchema
.partial()
.refine((obj) => Object.keys(obj).length > 0, {
  message: "At least one field must be provided",
})

//schema for querying branches 
export const getBranchesQuerySchema = z
.object({
  page: z
  .string()
  .optional()
  .transform((val) => Number(val) || 1)
  .refine((n) => n > 0, { message: "page must be >= 1" }),

  perPage: z
  .string()
  .optional()
  .transform((val) => Number(val) || 10)
  .refine((n) => n > 0 && n <= 100, {
    message: "perPage must be between 1 and 100",
  }),

  filter: z
  .string()
  .optional()
  .transform((str) => {
    try {
      return JSON.parse(str)
    } catch {
      return undefined
    }
  })
  .optional(), 

  searchTerm: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
  
})
