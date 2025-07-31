'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../../../components/common/loadingSpinner'
import { createClient } from '../../../../../../packages/utils/supabase/client.mjs'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    async function init() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.app_metadata?.tenantSlug) {
        const slug = user.app_metadata.tenantSlug
        router.replace(`https://${slug}.bukah.co/set-password`)
      } else {
        router.replace('/error')
      }
    }

    init()
  }, [])

  return <LoadingSpinner/>
}
