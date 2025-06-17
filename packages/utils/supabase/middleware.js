import { createServer } from "./server";
import { NextResponse } from "next/server";

export async function withAuth(request) {
  let res = NextResponse.next();
  const supabase = await createServer(request);

  // ensure auth cookie sync
  const { data: { user }} = await supabase.auth.getUser();
  if (!user && !request.nextUrl.pathname.match(/^\/(login|signup|api)/)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}
