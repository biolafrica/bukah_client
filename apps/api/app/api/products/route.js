import { createProductSchema, getProductQuerySchema } from "../../../src/products/schema"
import {addProduct, fetchAllProductWithCategory} from "../../../src/products/service"
//import { requireRole } from "@/apps/api/middleware/requireRole"
import { makeGetListHandler, makePostPayloadHandler } from "../../../src/lib/routeHandlers"


//export const middleware = requireRole(["admin", "supervisor"])

export const POST = makePostPayloadHandler(
  addProduct,
  createProductSchema,
  "adding product"
)


export const GET = makeGetListHandler(
  fetchAllProductWithCategory,
  getProductQuerySchema,
  "fetching products"
)