import {BaseRepo} from "../../../../packages/utils/database/baseRepository";

const repo = new BaseRepo(
  "branches",
  process.env.NEXT_PUBLIC_RESTAURANT_ID
)

export async function getAllBranches({
  searchTerm = '', 
  range = [0, 9] 
}={}){
  const search = searchTerm ? ['name', searchTerm] : []

  return repo.findAll({range, search})
}


export async function getAllBranchesWithSupervisor({ 
  searchTerm = '', 
  range = [0, 9] 
}={}){
  const  joins = { branch: 'users(first_name,last_name, id)'}
  const search = searchTerm ? ['name', searchTerm] : []

  return repo.findAll({search, joins, range})
}


export async function getBranchById(branchId){
  const  joins = { branch: 'users(first_name,last_name, id)'}

  return repo.findById(branchId, joins)
}


export async function createBranch(data){
  return repo.create(data)
}


export async function updateBranch(branchId, data){
  return repo.update(branchId, data)
}


export async function deleteBranch(branchId){
  return repo.delete(branchId)
}


export async function deactivateBranch(branchId){
  return repo.deactivate(branchId)
}


export async function activateBranch(branchId){
  return repo.reactivate(branchId)
}
