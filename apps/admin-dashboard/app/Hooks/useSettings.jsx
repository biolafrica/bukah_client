import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useSettings() {
  const qc = useQueryClient()

  // Fetch one settings record
  const fetchSettings = async () => {
    const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
    if (!res.ok) throw new Error('Failed to load settings')
    const json = await res.json()
    return json.settings.data[0]
  }

  const { data: raw, isLoading, isError } = useQuery({
    queryKey: ['settings'],
    queryFn:  fetchSettings,
  })

  // Update (mutationFn now plucks out the updated record)
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${raw.id}`,
        {
          method:  'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const errJson = await res.json()
        throw new Error(errJson.error || 'Update failed')
      }
      const json = await res.json()
      // **return the actual updated settings object** not the entire envelope
      return json.data;
    },
    onSuccess: (updatedSettings) => {
      // write that back into the cache so raw keeps its shape
      qc.setQueryData(['settings'], updatedSettings)
    },
  })

  return {
    raw,
    isLoading,
    isError,
    updateSettings: mutation.mutateAsync,
  }
}


