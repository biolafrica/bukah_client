import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";

export class ProductRepository extends BaseRepository{

  constructor (restaurantId){
    super("Products", restaurantId)
  }

  async findAllWithFK({searchTerm="", categoryId = null, branchId=null, range=[0,9]}={}){
    let query = supabase
    .from(this.table)
    .select(`
      id, 
      name, 
      image_url, 
      price, 
      description, 
      category: Product_categories(name), 
      branch: Branches(name)`,
      {count: "exact"}
    )

    query = query.eq('restaurant_id', this.restaurantId)

    if(searchTerm){
      query = query.ilike("name", `%${searchTerm}`)
    }

    if(categoryId){
      query = query.eq("category_id", categoryId)
    }

    if(branchId){
      query = query.eq("branch_id", branchId)
    }

    query = query.range(range[0], range[1])

    const {data, error, count} = await query
    if(error) throw new Error (`[products] findAllWithFK failed: ${error.message}`)
    return{data, count}
  }

  async findWithFKById(id){
    const {data, error} = await supabase
    .from(this.table)
    .select(`
      *, 
      category:Product_categories(name), 
      branch:Branches(name)
    `)
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error(`[products] findWithFKById failed: ${error.message}`)
    return data
  }

}