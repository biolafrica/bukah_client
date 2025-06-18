import { supabase } from "./supabaseClient";
import { BaseRepository } from "./baseRepository";

export class CustomerRepository extends BaseRepository{
  constructor(restaurantId){
    super("customers", restaurantId)
  }

  async findTopByField(field, limit = 5) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('restaurant_id', this.restaurantId)
      .order(field, { ascending: false })
      .limit(limit)

    if (error) throw new Error(`[customers] findTopByField(${field}) failed: ${error.message}`)
    return data
  }

  async findAllWithCounts({ 
    searchTerm = '', 
    type = null, 
    dateRange = null, 
    range = [0, 9]
  } = {}){

    const filters = {}
    if (type === 'registered') filters.is_registered = true
    if (type === 'guest') filters.is_registered = false
    if (dateRange) {
      filters.created_at = { start: dateRange.start, end: dateRange.end }
    }

    const search = searchTerm ? { key: 'name', value: searchTerm } : null

    // Main list
    const { data, count } = await this.findAllWithFKJoin({
      filters,
      search,
      range,
      count: true
    })

    // Aggregated counts
    const statusCounts = await this.countByGroup('is_registered')

    const stats = {
      total_customers: count,
      registered_customers: 0,
      guest_customers: 0
    }

    for (const row of statusCounts) {
      if (row.is_registered === true) stats.registered_customers = row.count
      if (row.is_registered === false) stats.guest_customers = row.count
    }
    
    return { data, count, stats }
  }

  async getTopCustomers(){

    const mostOrders = await this.findTopByField('total_orders', 5)
    const topSpenders = await this.findTopByField('total_spent', 5)

    return {
      most_orders: mostOrders,
      top_spenders: topSpenders
    }

  }

  async getCustomerOrders(customerId, range = [0, 9]){
    const {data, error} = await supabase
    .from("orders")
    .select(`
      id,
      total_amount,
      status,
      placed_at,
      order_channel,
      branch: branches(name),
      accepted_by: users(name)
    `, { count: 'exact' })
    .eq("customer_id", customerId)
    .order("placed_at", {ascending: false})
    .range(range[0], range[1])

    if (error) throw new Error (`[customer] getCustomerOrders failed: ${error.message}`)
    return data
  }

  async getCustomerFeedbacks(customerId, range = [0, 9]){
    const {data, error} = await supabase
    .from("feedbacks")
    .select("*", { count: 'exact' })
    .eq("customer_id", customerId)
    .order("created_at", {ascending: false})
    .range(range[0], range[1])

    if(error) throw new Error(`[customers] getCustomerFeedbacks failed: ${error.message}`)
    return data
  }

}