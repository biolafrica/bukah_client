import { useCrud } from "./useResource";

export function useBilling() {
  return useCrud({
    resourceKey: 'billings',
    baseUrl: '/api/billing-history',
  })
}