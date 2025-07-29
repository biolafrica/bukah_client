import { transformBranchList } from "../lib/transformer";
import { useCrud } from "./useResource";

export function useBranch(){
  return useCrud({
    resourceKey: 'branches',
    baseUrl: '/api/branches',
  })

}

export function useBranchStaff(id){
  return useCrud({
    resourceKey: 'branches',
    baseUrl: `/api/users?branch=${id}`,
    transform :transformBranchList
  })

}
