import { useQuery } from '@tanstack/react-query'

export function useMetricResource({ resourceKey, endpoint, transform = x => x, enabled = true }) {
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [resourceKey],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
      if (!res.ok) throw new Error(`Failed to fetch ${resourceKey}`)
      const json = await res.json()
      return transform(json.data)
    },
    enabled,
  })

  return {
    data,
    isLoading,
    isError,
    error,
  }
}
