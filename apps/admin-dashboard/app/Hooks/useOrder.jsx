import { useCrud } from "./useResource";

export function useOrders() {
  return useCrud({
    resourceKey: 'orders',
    baseUrl: '/api/orders',
  })
}

export function useRecentEmployeeOrders(userId) {
  return useCrud({
    resourceKey: 'orders',
    baseUrl: `/api/orders?range=0,6&user=${userId}`,
  })
}

export function useEmployeeOrders(userId) {
  return useCrud({
    resourceKey: 'orders',
    baseUrl: `/api/orders?user=${userId}`,
  })
}