import {ProductRepository } from "../../../../packages/utils/database/productRepository"
import {BaseRepository } from "../../../../packages/utils/database/baseRepository"

const repo = new ProductRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)
const componentRepo = new BaseRepository("product_components",process.env.NEXT_PUBLIC_RESTAURANT_ID)
const optionrepo = new BaseRepository("product_component_option",process.env.NEXT_PUBLIC_RESTAURANT_ID)

export async function addProduct(data){
  return repo.create(data)
}

export async function addProductComponents(data){
  return componentRepo.create(data)
}

export async function addProductOptions(data){
  return optionrepo.create(data)
}

export async function fetchAllProductWithCategory({
  searchTerm= "",
  range= [0,9],
  categoryId = null,
  branchId= null 
}){
  return repo.findAllWithFK({searchTerm,range,categoryId,branchId})
}

export async function fetchAllProductComponents(){
  return componentRepo.findAll()
}

export async function fetchProductById(productId){
  return repo.findWithFKById(productId)
}

export async function editProduct(productId, data){
  return repo.update(productId, data)
}

export async function deleteProduct(productId){
  return repo.delete(productId)
}

export async function deleteProductComponents(){}
export async function editProductComponents(){}




