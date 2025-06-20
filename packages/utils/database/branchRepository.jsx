import { BaseRepository } from "./baseRepository";

export class BranchRepository extends BaseRepository{
  constructor(restaurantId){
    super("branches", restaurantId)
  }

  async findAllWithSupervisor({
    searchTerm = "",
    range = [0, 9]
  }={}){

    return await this.findAllWithFKJoin({
      joins: { branch: 'users(first_name,last_name, id)' },
      search: searchTerm ? ['name', searchTerm] : [],
      range
    })
  }

  async findWithSupervisorById(id){
    return await this.findWithFKByIdJoin(id, { branch:"users(first_name,last_name, id)" })
  }

}