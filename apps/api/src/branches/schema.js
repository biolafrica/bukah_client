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