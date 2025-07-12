import { repos } from "../lib/repos";

export async function getAllStaffWithBranches({
  searchTerm =null, 
  branchId = null, 
  role =null, 
  isActive = null,  
  range = [0,9],
  name = null
}={}){
  const filters = {}
  const orderBy = {}

  if (branchId) filters.branch_id = branchId
  if (isActive !== null) filters.is_active = isActive
  if (role) filters.role = role
  if(name)orderBy.first_name = name

  const joins = { branch: 'branches(name, id)' }

  const search = searchTerm ? ['first_name', "last_name", searchTerm] : []
  
  return repos.user.findAll({filters,joins,search,range,orderBy})
}


export async function getStaffById(userId){
  const joins = { branch: 'branches(name, id)' }

  return repos.user.findById(userId, joins)
}

export async function addStaff(data){
  return repos.user.create(data)
}


export async function updateStaffDetails(userId, data){
  return repos.user.update(userId, data)
}


export async function deleteStaff(userId){
  return repos.user.delete(userId)
}

export async function suspendStaff(userId){
  return repos.user.deactivate(userId)
}


export async function reinstateStaff(userId){
  return repos.user.reactivate(userId)

}

export async function getStaffSessions(userId,{range=[0,9]}={}){
  const filters = {user_id : userId}
  return repos.session.findAll({filters, range})
}