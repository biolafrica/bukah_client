import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function usePaginatedTable({
  key,
  endpoint,
  page = 0,
  pageSize = 10,
  filters = {},
  revalidate = 60,
}) {
  const queryParams = useMemo(() => {
    const p = new URLSearchParams();

    // Append filters (including optional sort keys)
    for (const [k, v] of Object.entries(filters)) {
      if (v !== '') p.set(k, v);
    }

    const start = page * pageSize;
    const end = start + pageSize - 1;
    p.set('range', `${start},${end}`);

    return p.toString();
  }, [filters, page, pageSize]);

  return useQuery({
    queryKey: [key, queryParams],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${queryParams}`, {
        next: { revalidate },
      });
      if (!res.ok) throw new Error(`API Error: ${res.status} on ${endpoint}`);
      const json = await res.json();
      return {
        data: json.data?.data || [],
        count: json.data?.count || 0,
      };
    },
  });
}
