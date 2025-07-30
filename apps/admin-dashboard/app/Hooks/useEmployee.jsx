import { transformTopStaff } from "../lib/transformer";
import { useCrud } from "./useResource";

export function useEmployee(){
  return useCrud({
    resourceKey: 'employee',
    baseUrl: '/api/users',
  })

}

export function useEmployeeSessions(userId){
  return useCrud({
    resourceKey: "users",
    baseUrl: `/api/users/${userId}/sessions`,
  })
}

export function useTopStaff(){
  return useCrud({
    resourceKey: "users",
    baseUrl: '/api/common/users',
    transform: transformTopStaff
  })
}