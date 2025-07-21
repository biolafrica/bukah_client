import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useSettings() {
  const qc = useQueryClient()

  // Fetch
  const fetchSettings = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/settings`
    )
    if (!res.ok) throw new Error('Failed to load settings')
    const json = await res.json()
    return json.settings.data[0]
  }

  const { data: raw, isLoading, isError } = useQuery({
    queryKey: ['settings'],
    queryFn:  fetchSettings,
  })

  // Update
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${raw.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Update failed')
      }
      return res.json()
    },
    onSuccess: (updated) => {
      // keep cache in sync
      qc.setQueryData(['settings'], updated)
    },
  })

  return {
    raw,
    isLoading,
    isError,
    updateSettings: mutation.mutateAsync,
  }
}


