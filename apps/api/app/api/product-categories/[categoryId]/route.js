import { updateProductCategoriesSchema } from "../../../../src/product-categories/schema";
import * as service from "../../../../src/product-categories/service"
//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as helper from "../../../../src/lib/routeHandlers";

//export const middleware = requireRole(["admin", "supervisor"])

export const PUT = helper.makePutByIdHandler(
  "categoryId",
  service.editProductCategory,
  updateProductCategoriesSchema,
  "updating product category"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "categoryId",
  service.deleteProductCategory,
  "deleting product category"
)