import { useCrud } from "./useResource";

export function useEmployee(){
  return useCrud({
    resourceKey: 'employee',
    baseUrl: '/api/users',
  })

}