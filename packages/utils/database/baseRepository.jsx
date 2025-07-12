import { supabase } from "./supabaseClient"

export class BaseRepo{

  constructor(table, restaurantId=null){
    this.table = table
    this.restaurantId = restaurantId
  }

  async findAll ({
    joins = {},
    filters = {},
    search = [],
    range = [0,9],
    count = true,
    select = "*",
    orderBy = {}
  }={}){

    let selectFields = select
    const joinKeys = Object.keys(joins)
    if (joinKeys.length > 0) {
      const joinClauses = joinKeys.map((alias) => `${alias}:${joins[alias]}`)
      selectFields = [select, ...joinClauses].join(',')
    }

    
    const selectOpts = count ? { count: 'exact' } : undefined
    let query = supabase
    .from(this.table)
    .select(selectFields, selectOpts)

    if(this.restaurantId)filters.restaurant_id = this.restaurantId

    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        query = query.in(key, value)

      } else if (
        value &&
        typeof value === 'object' &&
        (value.start !== undefined || value.end !== undefined)

      ) {
        if (value.start) {
          query = query.gte(key, value.start.toISOString())
        }if (value.end) {
          query = query.lte(key, value.end.toISOString())
        }

      } else {
        query = query.eq(key, value)
      }
    }


    if (search.length === 2) {
      const [field, term] = search
      query = query.ilike(field, `%${term}%`)

    }else if (search.length === 3) {
      const [a, b, term] = search
      query = query.or(`${a}.ilike.%${term}%,${b}.ilike.%${term}%`)
    }
    
  
    if (orderBy && typeof orderBy === 'object' && Object.keys(orderBy).length > 0) {
      const [key, direction] = Object.entries(orderBy)[0];
      query = query.order(key, { ascending: direction === 'ascending' ?? true });
    }


    query = query.range(range[0], range[1])


    const { data, error, count: total } = await query
    if (error) {
      throw new Error(`${this.table} findAll failed: ${error.message}`)
    }


    return { data, count: total }
  }

  async findById(id, joins = {}, select = "*"){
    if (!id) {throw new Error(`${this.table} findById requires an ID`)}

    let selectFields = select
    const joinKeys = Object.keys(joins)
    if (joinKeys.length > 0) {
      const joinClauses = joinKeys.map((alias) => `${alias}:${joins[alias]}`)
      selectFields = [select, ...joinClauses].join(',')
    }

    const {data, error} = await supabase
    .from(this.table)
    .select(selectFields)
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error (`${this.table} findById failed: ${error.message}`)
    return data
 
  }


  async create(payload){
    const {data, error} = await supabase
    .from(this.table)
    .insert([payload])
    .select('id')  
    .single()

    if(error) throw new Error((`${this.table} item creation failed: ${error.message}`))
    return data.id
  }


  async update(id, payload){
    const {data, error} = await supabase
    .from(this.table)
    .update(payload)
    .select('id')  
    .eq("id", id)
    .single()

    if(error) throw new Error((`${this.table} item update failed: ${error.message}`))
    return data.id
  }


  async delete(id){
    const {data, error} = await supabase
    .from(this.table)
    .delete()
    .eq("id", id)

    if(error) throw new Error((`${this.table} item ${id} delete failed: ${error.message}`))
    return data
  }

  
  async countByGroup(groupKey, groupValue, {filters = {}, searchKey, searchTerm}={}) {
    let query = supabase
    .from(this.table)
    .select('*', { count: 'exact', head: true })
    .eq(groupKey, groupValue);

    if(searchTerm){
      query = query.ilike(searchKey, `%${searchTerm}%`)
    }
  
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { count, error } = await query;
    if (error) {
      throw new Error(`${this.table} countByGroup failed: ${error.message}`);
    }
    return count;
  }


  async deactivate(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: false})
    .eq("id", id)
    .single()

    if(error) throw new Error(`${this.table} deactivation failed: ${error.message}`)
    return data
  }


  async reactivate(id){
    const {data, error} = await supabase
    .from(this.table)
    .update({is_active: true})
    .eq("id", id)
    .single()

    if(error) throw new Error(`${this.table} reactivation failed: ${error.message}`)
    return data
  }

}
