import { updateProductCategoriesSchema } from "@/apps/api/src/product-categories/schema";
import * as error from "../../../../src/lib/errorHandler"
import * as service from "../../../../src/product-categories/service"
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
  const {categoryId} = params;
  error.handleParamIdError(categoryId, "category ID")

  try {
    const body = await request.json();
    const dto = updateProductCategoriesSchema.parse(body)

    const data = await service.editProductCategory(categoryId, dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    error.handleServerErrorWithZod(err, "updating product categories")

  }
}

export async function DELETE(__, {params}){
  const {categoryId} = params;
  error.handleParamIdError(categoryId, "category ID")

  try {
    await service.deleteProductCategory(categoryId)
    return NextResponse.json({message : "product category deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting product category")
    // manage deleting category with active order in frontend
  }

}