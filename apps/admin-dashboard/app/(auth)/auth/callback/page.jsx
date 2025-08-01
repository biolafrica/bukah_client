'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../utils/supabase/client'
import LoadingSpinner from '../../../components/common/loadingSpinner'

export default function AuthCallback() {
  const router = useRouter()
  
  useEffect(() => {
    const supabase = createClient()
    console.log("Current URL", window.location.href)

    async function init() {
      try {
        const { error, data } = await supabase.auth.exchangeCodeForSession()
        console.log("session data", data)

        if (error) {
          console.error("Exchange error:", error.message)
          router.replace('/login')
          return
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error("User fetch error:", userError?.message)
          router.replace('/login')
          return
        }

        if (user.app_metadata?.tenantSlug) {
          router.push('/password-reset')
        } else {
          router.replace('/error')
        }
      } catch (err) {
        console.error("Unexpected error in callback:", err)
        router.replace('/login')
      }
    }

    init()
  }, [router])

  return <LoadingSpinner />
}


