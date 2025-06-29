import { repos } from "../lib/repos"


export async function getAllTransaction({
  searchId = "", 
  branchId = null, 
  type = null, 
  method = null, 
  dateRange = null, 
  range =[0,9]
}={}){
  const filters = {}

  if (branchId) filters.branch_id = branchId
  if (type) filters.transaction_type = type
  if (method) filters.payment_method = method
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  const search = searchId ? ['reference_id', searchId] : []

  const joins = {
    branch: 'branches(name)',
    order: 'orders(id)',
  }

  return repos.transaction.findAll({search,filters,joins, range})
}

export async function getTransactionById(transactionId){
  const joins = {
    branch: 'branches(name)',
    order: 'orders(id)',
  }
  return repos.transaction.findById(transactionId, joins)
}