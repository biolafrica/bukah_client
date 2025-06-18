import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";

export class BranchRepository extends BaseRepository{
  constructor(restaurantId){
    super("branches", restaurantId)
  }

  async findAllWithSupervisor({range =[0,9]}={}){
    return await this.findAllWithFKJoin({
      joins:{
        supervisor: "users!branches_id(foreign_id = branch_id,first_name, last_name)"
      },
      filters:{},
      range
    })
  }

  async findWithUsersById(id){
    const {data, error} = await supabase
    .from(this.table)
    .select(`
      *,
      users:users!branch_id(
        id,
        first_name,
        last_name,
        email,
        role
      )
    `)
    .eq("id", id)
    .eq("restaurant_id", this.restaurantId)
    .maybeSingle()

    if(error)throw new Error(`[branches] findWithUsersById failed: ${error.message}`)
    return data
  }

}