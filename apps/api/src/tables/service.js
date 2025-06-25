import {BaseRepository} from "../../../../packages/utils/database/baseRepository"

const repo = new BaseRepository("tables", process.env.NEXT_PUBLIC_RESTAURANT_ID)

export async function getAllTables({count =true}){
  return repo.findAll({count})
}

export async function getTableById(tableId){
  return repo.findById(tableId)
}

export async function addTable(data){
  return repo.create(data)
}

export async function deleteTable(tableId){
  return repo.delete(tableId)

}

export async function updateTable(tableId, data){
  return repo.update(tableId, data)
}