import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";


export class OrderRepository extends BaseRepository{

  constructor(restaurantId){
    super("orders", restaurantId)
  }

  async findAllWithFK({searchId = "", branchId = null, status = null, channel = null, dateRange = null, range =[0,9]} = {}){

    const filters ={restaurant_id : this.restaurantId}

    if(branchId)filters.branch_id = branchId
    if(status)filters.status = status
    if(channel)filters.order_channel = channel

    let query = supabase
    .from()
    .select(`
      id,
      total_amount,
      status,
      order_channel,
      placed_at,
      branch: Branches(name),
      customer: Customers(name),
      accepted_by: Users(name)
    `, {count: "exact"})

    for(const [key, value] of Object.entries(filters)){
      query = query.eq(key, value)
    }

    if(searchId){
      query = query.ilike("id", `%${searchId}%`)
    }

    if(dateRange && dateRange.start && dateRange.end){
      query = query.gte("placed_at", dateRange.start).lte("placed_at", dateRange.end)
    }

    query = query.range(range[0], range[1])
    

    const statusCountsQuery = supabase
    .from(this.table)
    .select('status, count:id', {groupBy: "status"})
    .eq("restaurant_id", this.restaurantId)

    if(branchId) statusCountsQuery.eq("branch_id", branchId)
    if(channel) statusCountsQuery.eq("order_channel", channel)
    if(dateRange && dateRange.start && dateRange.end) {
      statusCountsQuery.gte("placed_at", dateRange.start).lte("placed_at", dateRange.end)
    }

    const[{data, error, count}, {data:statusCounts, error: countError}] = await Promise.all([
      query,
      statusCountsQuery
    ])

    if(error) throw new Error(`[orders] findAllWithFK failed: ${error.message}`)
    if(countError) throw new Error(`[orders] count status failed: ${countError.message}`)

    const stats = {
      total_orders: count,
      completed: 0,
      processing: 0,
      cancelled: 0
    }

    for (const row of statusCounts){
      const status = row.status
      const value = row.count
      if(status === "completed") stats.completed = value
      else if(status === "processing") stats.processing = value
      else if(status === "cancelled") stats.cancelled = value
    }

    return{data, count, stats}

  }

  async findWithFKById(id){
    const {data, error} = await supabase
    .from(this.table)
    .select(`
      *,
      branch: Branches(name),
      customer: Customer(name),
      accepted_by: Users(name),
      processed_by: Users(name),
      terminal: Terminals(name),
      Order_items(
        id,
        quantity,
        price,
        product: Products(
          name,
          price
        )
      )
    `)
    .eq("id", id)
    .maybeSingle()

    if(error) throw new Error(`[orders] findWithFKById failed: ${error.message}`)
    return data
  }
}