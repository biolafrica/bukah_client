import { BaseRepository } from "./baseRepository";


export class OrderRepository extends BaseRepository{

  constructor(restaurantId){
    super("orders", restaurantId)
  }

  async findAllWithFK({
    searchId = "", 
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

    return await this.findAllWithFKJoin({
      joins: {
        branch: 'branches(name)',
        customer: 'customers(name)',
        accepted_by: 'users(name)'
      },
      filters,
      search: searchId ? { key: 'id', value: searchId } : null,
      range
    })

  }

  async findWithFKById(id){
    return await super.findWithFKByIdJoin(id, {
      branch: 'branches(name)',
      customer: 'customers(name)',
      accepted_by: 'users(name)',
      processed_by: 'users(name)',
      terminal: 'terminals(name)',
      order_items: 'order_items(id, quantity, price, product: products(name, price))'
    })
  }

  async fetchStatusCounts(branchId = null, channel = null, dateRange = null) {
    const filters = {}
    if (branchId) filters.branch_id = branchId
    if (channel) filters.order_channel = channel
    if (dateRange) {
      filters.placed_at = { start: dateRange.start, end: dateRange.end }
    }

    return await this.countByGroup('status', filters)
  }
}