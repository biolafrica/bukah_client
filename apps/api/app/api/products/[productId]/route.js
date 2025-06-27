import * as helper from "../../../../src/lib/routeHandlers";
import { updateProductSchema } from "../../../../src/products/schema";
import * as service from "../../../../src/products/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "productId",
  service.fetchProductById,
  "fetching product"
)

export const PUT = helper.makePutByIdHandler(
  "productId",
  service.editProduct,
  updateProductSchema,
  "updating product"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "productId",
  service.deleteProduct,
  "deleting product"
)
