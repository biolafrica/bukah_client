import { repos } from "../lib/repos"

export async function getAllPOS({count =true}){
  return repos.pos.findAll({count})
}

export async function getPOSById(tableId){
  return repos.pos.findById(tableId)
}

export async function addPOS(data){
  return repos.pos.create(data)
}

export async function deletePOS(tableId){
  return repos.pos.delete(tableId)

}

export async function updatePOS(tableId, data){
  return repos.pos.update(tableId, data)
}