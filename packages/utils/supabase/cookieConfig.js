export function getCookieConfig() {
  return {
    name: process.env.COOKIE_NAME || 'sb-session',
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}
