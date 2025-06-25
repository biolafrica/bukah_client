import * as error from "../../../../../src/lib/errorHandler";
import { getStaffSessions } from "../../../../../src/users/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})
  
    const filters = {user_id : userId}
    const count = true;

    const sessions = await getStaffSessions({filters, count})
    if(!user)return NextResponse.json({error : "user session not found"}, {status : 404})

    return NextResponse.json({sessions},{status: 201})
    
  } catch (err) {
    return error.handleServerError(err, 'fetching staff sessions')
    
  }
}