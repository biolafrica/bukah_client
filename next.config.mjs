/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  // any other shared config…
}

// Add your Supabase cookie settings here
nextConfig.supabase = {
  cookieOptions: {
    name:     process.env.COOKIE_NAME ?? 'sb-client-session',
    domain:   process.env.COOKIE_DOMAIN ?? '.bukah.co',
    path:     '/',
    sameSite: 'lax',
    secure:   process.env.NODE_ENV === 'production',
  }
}

export default nextConfig
