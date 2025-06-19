import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/*export async function createClient(req) {
  const cookieStore = await cookies();
  // Get cookies from request

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        // You can set any headers here if needed
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        },
      },
    },
  });

  return supabase;
}*/
