//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "../../../src/product-categories/service"
import { createProductCategoriesSchema, getProductCategoryQuerySchema } from "../../../src/product-categories/schema"
import { makeGetListHandler, makePostPayloadHandler } from "../../../src/lib/routeHandlers"


//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  service.fetchAllProductCategory,
  getProductCategoryQuerySchema,
  "fetching product categories"


)

export const POST = makePostPayloadHandler(
  service.addProductCategory,
  createProductCategoriesSchema,
  "adding category"
)