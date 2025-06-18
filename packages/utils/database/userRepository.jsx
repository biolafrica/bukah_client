import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository{

  constructor(restaurantId){
    super("users", restaurantId)
  }

  async findAllWithFK({searchTerm = "", branchId = null, isActive = null, role=null, range = [0, 9]}={}){

    const filters = {}
    if (branchId) filters.branch_id = branchId
    if (isActive !== null) filters.is_active = isActive
    if (role) filters.role = role

    return await this.findAllWithFKJoin({
      joins: { branch: 'branches(name)' },
      filters,
      search: searchTerm ? { key: 'first_name', value: searchTerm } : null,
      searchOr: ['first_name', 'last_name'],
      range
    })

  }

  async findWithFKById(id){
    return await super.findWithFKByIdJoin(id, { branch:"branches(name)" })
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