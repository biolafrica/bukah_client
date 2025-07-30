import { useQuery } from '@tanstack/react-query'
import { createClient } from "../../../../packages/utils/supabase/client.mjs"
import { formatNumber } from '../utils/format'

export function useTopSellingProducts() {
  return useQuery({
    queryKey: ['top-selling-products'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase.rpc('top_5_best_selling_products')
      if (error) throw new Error(error.message)
      return data
    }
  })
}
 


