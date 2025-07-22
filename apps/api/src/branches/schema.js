import {z} from "zod";
import { makeQuerySchema } from "../lib/queryBuilder";

// The base branch payload
export const branchBaseSchema = z.object({
  restaurant_id: z.string().uuid("Invalid restaurant ID"),
  supervisor_id: z.string().uuid("Invalid supervisor ID").optional(),
  name: z.string().min(1, "Branch name is required"),
  address: z.string().min(2, "Branch address is required"),
  phone: z
  .string()
  .length(11, "Phone must be exactly 11 digits")
  .regex(/^\d+$/, "Phone can only contain digits"),
  offers_pickup: z.boolean(),
  pickup_charge: z.number().nonnegative("pickup charge must be >= 0").optional(),
  offers_eatin: z.boolean(),
  eatin_charge: z.number().nonnegative("eatin charge must be >= 0").optional(),
  is_active: z.boolean(),
})


export const createBranchSchema = branchBaseSchema.refine(
  (data) =>
    data.offers_pickup ? typeof data.pickup_charge === 'number' : true,
  { message: "pickup charge is required when offer pickup is true", path: ['pickup_charge'] }
).refine(
  (data) =>
    data.offers_eatin ? typeof data.eatin_charge === 'number' : true,
  { message: "eatin charge is required when offers eatin is true", path: ['eatin_charge'] }
)


export const updateBranchSchema = branchBaseSchema.partial().refine(
  (obj) => Object.keys(obj).length > 0, {
  message: "At least one field must be provided",
})


export const branchFields = {
  searchTerm: z.string().optional().default('')
}

export const getBranchesQuerySchema = makeQuerySchema(branchFields)