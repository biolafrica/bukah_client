import { repos } from "../lib/repos";

export async function getAllBranches({
  searchTerm = '', 
  range = [0, 9] 
}={}){
  const search = searchTerm ? ['name', searchTerm] : []

  return repos.branch.findAll({range, search})
}

export async function getAllBranchesWithSupervisor({ 
  searchTerm = '', 
  range = [0, 9] 
}={}){
  const  joins = { branch: 'users(first_name,last_name, id)'}
  const search = searchTerm ? ['name', searchTerm] : []

  return repos.branch.findAll({search, joins, range})
}

export async function getBranchById(branchId){
  const  joins = { branch: 'users(first_name,last_name, id)'}

  return repos.branch.findById(branchId, joins)
}

export async function createBranch(data){
  return repos.branch.create(data)
}

export async function updateBranch(branchId, data){
  return repos.branch.update(branchId, data)
}

export async function deleteBranch(branchId){
  return repos.branch.delete(branchId)
}

export async function deactivateBranch(branchId){
  return repos.branch.deactivate(branchId)
}

export async function activateBranch(branchId){
  return repos.branch.reactivate(branchId)
}
