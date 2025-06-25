import * as error from "../../../../../src/lib/errorHandler";
import { suspendStaff } from "../../../../../src/users/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin"])

export async function POST(__, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})
    
    const data = await suspendStaff(userId)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    error.handleServerError(err, "suspending staff")
    
  }

}