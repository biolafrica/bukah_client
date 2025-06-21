import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository{

  constructor(restaurantId){
    super("users", restaurantId)
  }

  async findAllWithFK({
    searchTerm = "", 
    branchId = null, 
    isActive = null, 
    role=null, 
    range = [0, 9]}={}){

    const filters = {}
    if (branchId) filters.branch_id = branchId
    if (isActive !== null) filters.is_active = isActive
    if (role) filters.role = role

    return await this.findAllWithFKJoin({
      joins: { branch: 'branches(name, id)' },
      filters,
      search: searchTerm ? ['first_name', "last_name", searchTerm] : [],
      range
    })

  }
    
  async findWithFKById(id){
    return await super.findWithFKByIdJoin(id, { branch:"branches(name, id)" })
  }

}