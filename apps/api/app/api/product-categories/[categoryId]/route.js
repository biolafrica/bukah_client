import { updateProductCategoriesSchema } from "../../../../src/product-categories/schema";
import * as error from "../../../../src/lib/errorHandler"
import * as service from "../../../../src/product-categories/service"
import { NextResponse } from "next/server";
import { schemaBodyParser } from "../../../../src/lib/schemaParser";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function PUT(request, {params}){
  try {
    const {categoryId} = await params;
    if(!categoryId)return NextResponse.json({error : 'category ID is required'}, {status : 400})

    const dto = await schemaBodyParser(request, updateProductCategoriesSchema)

    const data = await service.editProductCategory(categoryId, dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating product categories")

  }
}

export async function DELETE(__, {params}){
  try {
    const {categoryId} = await params;
    if(!categoryId)return NextResponse.json({error : 'category ID is required'}, {status : 400})

    await service.deleteProductCategory(categoryId)
    return NextResponse.json({message : "product category deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting product category")
    // manage deleting category with active order in frontend
  }

}