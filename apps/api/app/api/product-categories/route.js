//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "../../../src/product-categories/service"
import { NextResponse } from "next/server"
import { createProductCategoriesSchema, getProductCategoryQuerySchema } from "../../../src/product-categories/schema"
import { handleServerErrorWithZod } from "@/apps/api/src/lib/errorHandler"

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const { name, range } = getProductCategoryQuerySchema.parse(raw)

    const filters = {name}

    const data = await service.fetchAllProductCategory({ filters, range })

    return NextResponse.json({data}, {status: 201})

  } catch (err) {
    return handleServerErrorWithZod(err, "fetching product categories")
  }

}

export async function POST(request){
  try {
    const body = await request.json()
    const dto = createProductCategoriesSchema.parse(body)

    const data = await service.addProductCategory(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "adding category")
    
  }

}