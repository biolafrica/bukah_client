import { useCrud } from "./useResource";
import { useQuery } from '@tanstack/react-query'


export function useSingleMenu() {
  return useCrud({
    resourceKey: 'product',
    baseUrl: '/api/products',
  })
}

export function useComboMenu(){
  return useCrud({
    resourceKey: 'combo-product',
    baseUrl: '/api/products/combo',
  })

}

export function useFetchCombo(id){
  const { data, error, isLoading } = useQuery({
    queryKey: ['combo-product', id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/combo/${id}`)
      if (!res.ok) throw new Error('Failed to fetch combo')
      return await res.json()
    },
    enabled: Boolean(id),
  })

  return {data, error, isLoading}

}
