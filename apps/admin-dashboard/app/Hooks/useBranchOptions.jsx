import { useQuery } from '@tanstack/react-query'

async function fetchBranches() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`
  )

  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    throw new Error(json.error || 'Failed to load branches')
  }

  const json = await res.json()
  const raw = json.data?.data ?? []
  return raw.map(b => ({ value: b.id, label: b.name }))
}

export function useBranchOptions() {
  return useQuery({
    queryKey: ['branchOptions'],
    queryFn:   fetchBranches,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}