import { useOptions } from "./useOptions";

export function useSingleItemsOptions() {
  return useOptions({
    queryKey: 'itemOptions',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/common/products`,
    mapItem: b => ({ value: b.id, label: b.name }),
    config: { staleTime: 60 * 60 * 1000 },
  })
}