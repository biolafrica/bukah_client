import { z } from "zod";
import { makeQuerySchema } from "../lib/queryBuilder";


export const createProductCategoriesSchema = z.object({
  restaurant_id : z.string().uuid("Invalid Restaurant ID"),
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
})

export const updateProductCategoriesSchema = createProductCategoriesSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})

export const productCategoryField = {
  name : z.string().optional().default('')
}

export const getProductCategoryQuerySchema = makeQuerySchema(productCategoryField)