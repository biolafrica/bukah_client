import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { reinstateStaff } from "../../../../../src/users/service";
import * as error from "../../../../../src/lib/errorHandler";

//export const middleware = requireRole(["admin"])

export async function POST(__, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})
    
    const data = await reinstateStaff(userId)
    return NextResponse.json({data},{status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "reinstating staff")
  }
}