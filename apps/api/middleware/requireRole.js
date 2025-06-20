import { NextResponse } from "next/server";
import {getSessionUser} from "@/packages/utils/supabase/auth"

export function requireRole(allowedRoles =[]){
  return async(request)=>{
    const user = await getSessionUser(request)
    if(!user || !allowedRoles.includes(user.role)){
      return new NextResponse(JSON.stringify({error: "Forbidden"}), {status: 403})
    }
    return NextResponse.next()
  }
}