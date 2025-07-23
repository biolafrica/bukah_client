import { useCrud } from "./useResource";

export function useEmployee(){
  return useCrud({
    resourceKey: 'employee',
    baseUrl: '/api/users',
  })

}

export function useEmployeeSessions(userId){
  return useCrud({
    resourceKey: "employee_sessions",
    baseUrl: `api/users/${userId}/sessions`
  })
}