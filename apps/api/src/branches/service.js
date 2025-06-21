import {BranchRepository} from"@/packages/utils/database/branchRepository";

const repo = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

export async function getAllBranches({ searchTerm = '', range = [0, 9] } = {}){
  const [start, end] = range
  return repo.findAll({
    skip: start,
    take: end - start + 1,
    where: {
      name: { contains: searchTerm, mode: 'insensitive' }
    }
  })
}


export async function getAllBranchesWithSupervisor({ searchTerm = '', range = [0, 9] } = {}){
  const [start, end] = range
  return repo.findAllWithSupervisor({
    skip: start,
    take: end - start + 1,
    where: {
      name: { contains: searchTerm, mode: 'insensitive' }
    }
  })
}


export async function getBranchById(branchId){
  return repo.findWithSupervisorById(branchId)
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
