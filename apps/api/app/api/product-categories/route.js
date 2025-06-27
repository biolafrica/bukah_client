//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "../../../src/product-categories/service"
import { NextResponse } from "next/server"
import { createProductCategoriesSchema, getProductCategoryQuerySchema } from "../../../src/product-categories/schema"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler"
import { schemaUrlParser } from "../../../src/lib/schemaParser"
import { makePostPayloadHandler } from "../../../src/lib/routeHandlers"

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const { name, range } = getProductCategoryQuerySchema.parse(raw)

    const filters = name ? {name} : null

    const data = await service.fetchAllProductCategory({filters, range })

    return NextResponse.json({data}, {status: 201})

  } catch (err) {
    return handleServerErrorWithZod(err, "fetching product categories")
  }

}

export const POST = makePostPayloadHandler(
  service.addProductCategory,
  createProductCategoriesSchema,
  "adding category"
)