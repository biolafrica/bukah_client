import { BaseRepository } from "./baseRepository";

export class ProductRepository extends BaseRepository{

  constructor (restaurantId){
    super("products", restaurantId)
  }

  async findAllWithFK({searchTerm= "", categoryId = null, branchId= null, range= [0,9]} = {}){

    const filters = {}
    if(branchId)filters.branch_id = branchId
    if(categoryId)filters.category_id = categoryId

    return await super.findAllWithFKJoin({
      joins: {
        branch: "branches(name)", 
        category: "product_categories(name)"
      },
      filters,
      search: searchTerm ? ['name', searchTerm] : [],
      range
    })
    
  }

  async findWithFKById(id){
    return await this.findWithFKByIdJoin(id, {
      branch: "branches(name)",
      category: "product_categories(name)" 
    })
  }

}