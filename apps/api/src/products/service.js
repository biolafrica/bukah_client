import { repos } from "../lib/repos"


export async function addProduct(data){
  return repos.product.create(data)
}

export async function addProductComponents(data){
  return repos.component.create(data)
}

export async function addProductOptions(data){
  return repos.option.create(data)
}

export async function fetchAllProductWithCategory({
  searchTerm= "",
  range= [0,9],
  categoryId = null,
  branchId= null,
  name = null, 
}={}){
  const filters = {}
  const orderBy = {}

  if(branchId)filters.branch_id = branchId
  if(categoryId)filters.category_id = categoryId

  if(name)orderBy.name = name

  const search = searchTerm ? ['name', searchTerm] : []

  const joins = {
    branch: "branches(name)", 
    category: "product_categories(name)",
  }

  return repos.product.findAll({search, filters, range, joins,orderBy})
}


export async function fetchAllProductComponents(){
  return repos.component.findAll()
}

export async function fetchProductById(productId){
  const joins = {
    branch: "branches(name)", 
    category: "product_categories(name)"
  }

  return repos.product.findById(productId, joins)
}

export async function editProduct(productId, data){
  return repos.product.update(productId, data)
}

export async function deleteProduct(productId){
  return repos.product.delete(productId)
}

export async function deleteProductComponents(){}
export async function editProductComponents(){}




