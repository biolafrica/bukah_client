import { useQuery } from '@tanstack/react-query'

export function useOptions({ queryKey, url, mapItem, config = {} }) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetch(url)
      if (!res.ok) {
        let err = 'Failed to load ' + queryKey
        try { err = (await res.json()).error || err } catch {}
        throw new Error(err)
      }
      const json = await res.json()
      const raw  = json.data?.data || []
      return raw.map(mapItem)
    },
    
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...config,
  })
}