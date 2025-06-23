import {UserRepository} from "../../../../packages/utils/database/userRepository";

const repo = new UserRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)


export async function getAllStaffWithBranches({searchTerm =null, branchId = null, role =null, isActive = null,  range = [0,9]}){
  return repo.findAllWithFK({searchTerm, branchId, role, range, isActive})
}


export async function getStaffById(userId){
  return repo.findWithFKById(userId)
}


export async function addStaff(data){
  return repo.create(data)
}


export async function updateStaffDetails(userId, data){
  return repo.update(userId, data)
}


export async function deleteStaff(userId){
  return repo.delete(userId)
}

export async function suspendStaff(userId){
  return repo.deactivate(userId)
}


export async function reinstateStaff(userId){
  return repo.reactivate(userId)

}