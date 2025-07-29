// hooks/useCrud.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


export function useCrud({ resourceKey, baseUrl, transform = x => x, }) {
  const qc = useQueryClient()

  // Fetch all
  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: [resourceKey],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${baseUrl}`)
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Failed to load ${resourceKey}`)
      }
      const payload = await res.json()
      const rawList = payload.data?.data ?? payload[resourceKey] ?? []
      return rawList.map(transform)
    }
  })

  // Create
  const { mutateAsync: add } = useMutation({
    mutationFn: async (item) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }
      )
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Failed to add to ${resourceKey}`)
      }
      return res.json()
    },
    onSuccess: () => qc.invalidateQueries([resourceKey])
  })

  // Update
  const { mutateAsync: update } = useMutation({
    mutationFn: async ({ id, ...item }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }
      )
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Failed to update ${resourceKey}`)
      }
      const resJson = res.json()
      return resJson.data;
    },
    onSuccess: () => qc.invalidateQueries([resourceKey])
  })

  // Delete
  const { mutateAsync: remove } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}/${id}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Failed to delete from ${resourceKey}`)
      }
      return id
    },
    onSuccess: () => qc.invalidateQueries([resourceKey])
  })

  return {
    items,
    isLoading,
    isError,
    error,
    add,
    update,
    remove,
  }
}


