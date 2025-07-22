import { useOptions } from './useOptions'

export function useBranchOptions() {
  return useOptions({
    queryKey: 'branchOptions',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`,
    mapItem: b => ({ value: b.id, label: b.name }),
    config: { staleTime: 60 * 60 * 1000 },
  })
}
