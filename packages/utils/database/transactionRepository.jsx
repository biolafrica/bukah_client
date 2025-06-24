import { BaseRepository } from "./baseRepository";

export class TransactionRepository extends BaseRepository{

  constructor(restaurantId){
    super("transactions", restaurantId)
  }

  async findAllTransactionWithFK({
    searchId = "", 
    branchId = null, 
    type = null, 
    method= null, 
    dateRange = null, 
    range =[0,9]
  } = {}){

    const filters = {}
    if (branchId) filters.branch_id = branchId
    if (type) filters.transaction_type = type
    if (method) filters.payment_method = method
    if (dateRange) {
      filters.created_at = { start: dateRange.start, end: dateRange.end }
    }

    return await this.findAllWithFKJoin({
      joins: {
        branch: 'branches(name)',
        order: 'orders(id)',
      },
      filters,
      search: searchId ? ['id', searchId] : [],
      range
    })

  }

  async findTransactionById(id){
    return await this.findWithFKByIdJoin(id, {
      branch: 'branches(name)',
      order: 'orders(id)',
    })
  }

} 