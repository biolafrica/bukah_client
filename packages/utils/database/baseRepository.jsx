import { supabase } from "./supabaseClient"

export class BaseRepository{

  constructor(table, restaurantId=null){
    this.table = table
    this.restaurantId = restaurantId
  }

  async findAll({filters = {}, range=[0,9], select="*", count = false, search = null, orderBy = null}={}){
    let query = supabase
    .from(this.table)
    .select(select, count?{count:"exact"}: undefined)

    const fullFilter = {...filters}
    if(this.restaurantId)fullFilter.restaurant_id = this.restaurantId
    console.log("full filter", fullFilter)

    for(const [key,value]of Object.entries(fullFilter)){
      query = query.eq(key, value)
    }

    if(search && search.key && search.value){
      query = query.ilike(search.key, `%${search.value}%`)
    }

    if(orderBy && orderBy.key){
      query = query.order(orderBy.key, {ascending: orderBy.ascending ?? true})
    }

    if(range){
      query= query.range(range[0], range[1])
    }

    const {data, error, count:total} = await query
    if(error) throw new Error(`[${this.table}] findAll failed: ${error.message}`)
    return {data, count:total}

  }

  async findAllWithFKJoin({
    joins = {},
    filters = {},
    search = [],
    range = [0,9],
    count = true,
  }={}){

    const selectFields = ["*", ...Object.entries(joins).map(([alias,join])=>`${alias}:${join}`)].join(",")

    let query = supabase
    .from(this.table)
    .select(selectFields, count? {count: "exact"}: undefined)

    if(this.restaurantId)filters.restaurant_id = this.restaurantId

    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        query = query.in(key, value)

      } else if (value && typeof value === 'object' && ('start' in value || 'end' in value)) {
        if (value.start) query = query.gte(key, value.start)
        if (value.end) query = query.lte(key, value.end)
          
      } else {
        query = query.eq(key, value)
      }
    }

    if(search.length === 2){
      query = query.ilike(
        `${search[0]}`, `%${search[1]}%`
      )
    }

    if(search.length === 3){
      query= query.or(
        `${search[0]}.ilike.%${search[2]}%,`+ 
        `${search[1]}.ilike.%${search[2]}%`
      )
    }

    query = query.range(range[0], range[1])


    const {data, error, count: total} = await query
    if(error) throw new Error(`[${this.table}] findAllWithFKJoin failed: ${error.message}`)
    return {data, count: total}
    
  }

  async findById(id){
    const {data, error} = await supabase
    .from(this.table)
    .select("*")
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error((`[${this.table}] findby ${id} failed: ${error.message}`))
    return data
  }

  async findWithFKByIdJoin(id, joins){
    const selectFields = ["*", ...Object.entries(joins).map(([alias,join])=>`${alias}:${join}`)].join(",")

    const {data, error} = await supabase
    .from(this.table)
    .select(selectFields)
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error (`[${this.table}] findWithFKById failed: ${error.message}`)
    return data
 
  }

  async create(payload){
    const {data, error} = await supabase
    .from(this.table)
    .insert([payload])
    .single()

    if(error) throw new Error((`[${this.table}] item creation failed: ${error.message}`))
    return data
  }

  async update(id, payload){
    const {data, error} = await supabase
    .from(this.table)
    .update(payload)
    .eq("id", id)
    .single()

    if(error) throw new Error((`[${this.table}] item update failed: ${error.message}`))
    return data
  }

  async delete(id){
    const {data, error} = await supabase
    .from(this.table)
    .delete()
    .eq("id", id)

    if(error) throw new Error((`[${this.table}] item ${id} delete failed: ${error.message}`))
    return data
  }

  async countByGroup(groupKey, groupValue, extraFilters = {}) {
    if (this.restaurantId) {
      extraFilters.restaurant_id = this.restaurantId;
    }

    let query = supabase
    .from(this.table)
    .select('*', { count: 'exact', head: true })
    .eq(groupKey, groupValue);

  
    for (const [key, value] of Object.entries(extraFilters)) {
      query = query.eq(key, value);
    }

    const { count, error } = await query;
    if (error) {
      throw new Error(`[${this.table}] countByGroup failed: ${error.message}`);
    }
    return count;
  }

  async deactivate(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: false})
    .eq("id", id)
    .single()

    if(error) throw new Error(`[users] deactivateUser failed: ${error.message}`)
    return data
  }

  async reactivate(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: true})
    .eq("id", id)
    .single()

    if(error) throw new Error(`[users] reactivateUser failed: ${error.message}`)
    return data
  }

}
