import { useOptions } from "./useOptions";

export function useCategoryOptions() {
  return useOptions({
    queryKey: 'categoryOptions',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/common/product-categories`,
    mapItem: c => ({ value: c.id, label: c.name }),
    config: { staleTime: 60 * 1000 },
  })
}