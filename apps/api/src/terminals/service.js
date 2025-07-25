import { repos } from "../lib/repos";

export async function getAllTerminals({count =true}){
  const joins = {
    branch: "branches(name)"
  }
  return repos.terminals.findAll({count,joins})
}

export async function getTerminalsById(tableId){
  return repos.terminals.findById(tableId)
}

export async function addTerminals(data){
  return repos.terminals.create(data)
}

export async function deleteTerminals(tableId){
  return repos.terminals.delete(tableId)

}

export async function updateTerminals(tableId, data){
  return repos.terminals.update(tableId, data)
}