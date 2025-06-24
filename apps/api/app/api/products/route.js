import { schemaBodyParser, schemaUrlParser } from "@/apps/api/src/lib/schemaParser"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler"
import { createProductSchema, getProductQuerySchema } from "../../../src/products/schema"
import * as service from "../../../src/products/service"
//import { requireRole } from "@/apps/api/middleware/requireRole"
import { NextResponse } from "next/server"

//export const middleware = requireRole(["admin", "supervisor"])

export async function POST(request){
  try {
    const dto = await schemaBodyParser(request, createProductSchema)

    const data = await service.addProduct(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "adding product")
  }
}


export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const {
      searchTerm, 
      categoryId, 
      branchId, 
      range 
    } = getProductQuerySchema.parse(raw)

    const data = await service.fetchAllProductWithCategory({ searchTerm,categoryId,branchId,range })

    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "fetching products")
  }
}