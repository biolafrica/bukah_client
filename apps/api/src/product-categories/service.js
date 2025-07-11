import { repos } from "../lib/repos"


export async function addProductCategory(data){
  return repos.productCategory.create(data)
}

export async function editProductCategory(categoryId, data){
  return repos.productCategory.update(categoryId, data)
}

export async function deleteProductCategory(categoryId){
  return repos.productCategory.delete(categoryId)
}

export async function fetchAllProductCategory({
range=[0,9]}={}){
  return repos.productCategory.findAll({range})
}