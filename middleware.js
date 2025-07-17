import { withAuth } from "./packages/utils/supabase/middleware";
export function middleware(req) { return withAuth(req) }
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"]
};
