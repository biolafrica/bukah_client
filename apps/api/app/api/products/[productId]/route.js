import * as error from "@/apps/api/src/lib/errorHandler";
import { schemaBodyParser } from "@/apps/api/src/lib/schemaParser";
import { updateProductSchema } from "@/apps/api/src/products/schema";
import * as service from "@/apps/api/src/products/service";
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__,{params}){
  try {
    const {productId} = await params;
    error.handleParamIdError(productId, "product ID")

    const product = await service.fetchProductById(productId)
    error.handleFetchByIdError(product, "product not found")

    return NextResponse.json({product},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching product")
    
  }
}

export async function PUT(request,{params}){
  const {productId} = params;
  error.handleParamIdError(productId, "product ID")

  try {
    const dto = await schemaBodyParser(request, updateProductSchema)

    const data = await service.editProduct(productId, dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    error.handleServerErrorWithZod(err, "updating product")
  }
}

export async function DELETE(__,{params}){
  const {productId} = params;
  error.handleParamIdError(productId, "product ID")

  try {
    await service.deleteProduct(productId)
    return NextResponse.json({message : "Branch deleted"}, {status: 201})
    
  } catch (error) {
    return error.handleServerError(err, "deleting branch")
    
  }
}
