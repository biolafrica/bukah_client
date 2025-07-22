import { useOptions } from "./useOptions";

export function useSupervisorOptions() {
  return useOptions({
    queryKey: 'supervisorOptions',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/common/supervisors`,
    mapItem: s => ({ value: s.id, label: `${s.first_name} ${s.last_name}` }),
    config: { staleTime: 2 * 60 * 1000 },
  })
}