import * as error from "../../../../src/lib/errorHandler";
import { schemaBodyParser } from "../../../../src/lib/schemaParser";
import { updateProductSchema } from "../../../../src/products/schema";
import * as service from "../../../../src/products/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__,{params}){
  try {
    const {productId} = await params;
    if(!productId)return NextResponse.json({error : 'product ID is required'}, {status : 400})

    const product = await service.fetchProductById(productId)
    if(!product)return NextResponse.json({error : "product not found"}, {status : 404})
    
    return NextResponse.json({product},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching product")
    
  }
}

export async function PUT(request,{params}){
  try {
    const {productId} = await params;
    error.handleParamIdError(productId, "product ID")

    const dto = await schemaBodyParser(request, updateProductSchema)

    const data = await service.editProduct(productId, dto)
    return NextResponse.json({message : "product updated successfully"}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating product")
  }
}

export async function DELETE(__,{params}){
  try {
    const {productId} = await params;
    error.handleParamIdError(productId, "product ID")

    await service.deleteProduct(productId)
    return NextResponse.json({message : "product deleted"}, {status: 201})
    
  } catch (error) {
    return error.handleServerError(err, "deleting product")
    
  }
}
