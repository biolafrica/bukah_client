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

    const search = searchTerm ? ['name', searchTerm] : [];

    // Main list
    const { data, count } = await this.findAllWithFKJoin({
      filters,
      search,
      range,
      count: true
    })

    // Aggregated counts
    const registeredCounts = await this.countByGroup('is_registered', true)

    const stats = {
      total_customers: count,
      registered_customers: registeredCounts,
      guest_customers: count - registeredCounts
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

  // Fetch getOrders by a specific customer in Order REpository
  // Fetch getFeedbacks by a specific customer in Feedback Repository

}