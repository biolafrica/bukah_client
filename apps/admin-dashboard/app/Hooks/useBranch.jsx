import { useCrud } from "./useResource";

export function useBranch(){
  return useCrud({
    resourceKey: 'branches',
    baseUrl: '/api/branches',
  })

}