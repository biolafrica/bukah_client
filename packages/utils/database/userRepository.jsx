import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository{

  constructor(restaurantId){
    super("Users", restaurantId)
  }

  async findAllWithFK({searchTerm = "", branchId = null, isActive = null, role=null, range = [0, 9]}={}){
    let query = supabase
    .from(this.table)
    .select(`
      id,
      first_name,
      last_name,
      email,
      role,
      is_active,
      branch: Branches(name)
    `, {count: "exact"})

    query = query.eq("restaurant_id", this.restaurantId)

    if(searchTerm){
      query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
    }

    if(branchId){
      query = query.eq("branch_id", branchId)
    }

    if(isActive !== null){
      query = query.eq('is_active', isActive)
    }

    if(role){
      if(Array.isArray(role)){
        query=query.in("role", role)
      }else{
        query = query.eq("role", role)
      }
    }

    query = query.range(range[0], range[1])

    const {data, error, count} = await query
    if(error) throw new Error (`[users] findAllWithFK failed: ${error.message}`)
    return {data}
  }

  async findWithFKById(id){
    const {data, error} = await supabase
    .from(this.table)
    .select(`*, branch:Branches(name)`)
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error (`[users] findWithFKById failed: ${error.message}`)
    return data

  }

  async deactivateUser(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: false})
    .eq("id", id)
    .single()

    if(error) throw new Error(`[users] deactivateUser failed: ${error.message}`)
    return data
  }

  async reactivateUser(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: true})
    .eq("id", id)
    .single()

    if(error) throw new Error(`[users] reactivateUser failed: ${error.message}`)
    return data
  }
  
}