import { NextResponse } from 'next/server'

const ALLOWED = [
  'http://localhost:3002',
  process.env.FRONTEND_URL
].filter(Boolean)

export function middleware(request) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  if (origin && ALLOWED.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers
    })
  }

  return response
}

export const config = {
  matcher: '/api/:path*'
}
