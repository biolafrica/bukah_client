import { z } from "zod";
import { makeQuerySchema } from "../lib/queryBuilder";

export const createProductSchema = z.object({
  restaurant_id : z.string().uuid("Invalid Restaurant ID"),
  branch_id : z.string().uuid("Invalid Restaurant ID"),
  name : z.string().min(1, "Product name is required"),
  price : z.number().positive("Product price must be > 0"),
  is_combo : z.boolean(),
  preparation_time : z.number().positive("Preparation time must be > 0"),
  category_id : z.string().uuid("Invalid Restaurant ID"),
  available: z.boolean(),
  isActive : z.boolean(),
  image_url : z.string().min(1, "Product image is required"),

})

export const updateProductSchema = createProductSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})

export const productFields = {
  searchTerm : z.string().optional().default(""), 
  categoryId : z.string().uuid().optional(), 
  branchId :z.string().uuid().optional()
}

export const getProductQuerySchema = makeQuerySchema(productFields)

