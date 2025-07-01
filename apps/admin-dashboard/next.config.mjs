// apps/admin/next.config.mjs
import common from '../../next.config.mjs'

export default {
  ...common,
  supabase: {
    cookieOptions: {
      ...common.supabase.cookieOptions,
      name: 'sb-admin-session',       // app-specific override
    }
  }
}
