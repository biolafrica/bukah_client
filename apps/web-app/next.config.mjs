// apps/web/next.config.mjs
import common from '../../next.config.mjs'

export default {
  ...common,
  supabase: {
    cookieOptions: {
      ...common.supabase.cookieOptions,
      name: 'sb-web-session'
    }
  }
}
