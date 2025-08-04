import { useCrud } from "./useResource";

export function useCategory() {
  return useCrud({
    resourceKey: 'product-categories',
    baseUrl: '/api/product-categories',
  })
}