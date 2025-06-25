import {BaseRepository} from "../../../../packages/utils/database/baseRepository";

const repo = new BaseRepository("product_categories", process.env.NEXT_PUBLIC_RESTAURANT_ID )

export async function addProductCategory(data){
  return repo.create(data)
}

export async function editProductCategory(categoryId, data){
  return repo.update(categoryId, data)
}

export async function deleteProductCategory(categoryId){
  return repo.delete(categoryId)
}

export async function fetchAllProductCategory({count = true, filters={}, range=[0,9]}){
  return repo.findAll({count, filters, range})
}