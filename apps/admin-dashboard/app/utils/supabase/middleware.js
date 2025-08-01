import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

const ADMIN_ROLES = ['admin', 'manager', 'supervisor', 'owner'];

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const host = request.headers.get('host') || '';
  const subdomain = host.includes('localhost')
    ? process.env.LOCAL_DEFAULT_TENANT || 'kanko'
    : host.split('.')[0];

  const publicRoutes = ['/login', '/password-reset','/email-reset', '/auth/callback'];
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('Middleware User:' , user);
  console.log('Is Public Route:', isPublicRoute);
  console.log('Current Path:', request.nextUrl.pathname)

 
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  if (user) {
    const userTenantSlug = user.app_metadata?.tenantSlug;
    const userRole = user.user_metadata?.role;

    if ((!userTenantSlug || userTenantSlug !== subdomain || !ADMIN_ROLES.includes(userRole))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = !ADMIN_ROLES.includes(userRole) ? '/login' : '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
