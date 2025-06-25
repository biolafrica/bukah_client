import { BaseRepository } from "./baseRepository";


export class OrderRepository extends BaseRepository{

  constructor(restaurantId){
    super("orders", restaurantId)
  }

  async findAllWithFK({
    searchTerm = "",  
    branchId = null, 
    status = null, 
    channel = null, 
    dateRange = null, 
    range =[0,9]
  } = {}){
    const filters = {}
    if (branchId) filters.branch_id = branchId
    if (status) filters.status = status
    if (channel) filters.order_channel = channel
    if (dateRange) {
      filters.placed_at = { start: dateRange.start, end: dateRange.end }
    }

    const { data, count } = await this.findAllWithFKJoin({
      joins: {
        branch: 'branches(name)',
        customer: 'customers(name)',
        accepted_by: 'users(first_name)',
    
      },
      filters,
      search: searchTerm ? ['order_code', searchTerm] : [],
      range
    })
    
    const searchKey = 'order_code'
    const processingCounts = await this.countByGroup('status', "preparing", {filters,searchKey, searchTerm});
    const completedCounts = await this.countByGroup('status', "ready", {filters,searchKey,searchTerm})

    const stats = {
      total_order: count,
      processing_order: processingCounts,
      completed_order: completedCounts,
      cancelled_order: count - (processingCounts + completedCounts),
    }

    return {data, count, stats }
  }

  async findWithFKById(id){
    return await super.findWithFKByIdJoin(id, {
      branch: 'branches(name)',
      customer: 'customers(name)',
      accepted_by: 'users(first_name)',
      processed_by: 'users(last_name)',
      terminal: 'terminals(name)',
      order_items: 'order_items(id, quantity, price, product: products(name, price))'
    })
  }


}