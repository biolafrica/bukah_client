import {TransactionRepository} from "../../../../packages/utils/database/transactionRepository"

const repo = new TransactionRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

export async function getAllTransaction({
  searchId = "", 
  branchId = null, 
  type = null, 
  method = null, 
  dateRange = null, 
  range =[0,9]
}){
  return repo.findAllTransactionWithFK({searchId,branchId,type,method,dateRange,range})
}

export async function getTransactionById(transactionId){
  return repo.findTransactionById(transactionId)
}