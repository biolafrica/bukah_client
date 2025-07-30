"use client"

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}


export function getTopSellingProducts() {
  const supabase = createClient();
  return supabase.rpc('top_5_best_selling_products')
}
