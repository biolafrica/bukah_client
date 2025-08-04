import { useCrud } from "./useResource";


export function useSingleMenu() {
  return useCrud({
    resourceKey: 'product',
    baseUrl: '/api/products',
  })
}