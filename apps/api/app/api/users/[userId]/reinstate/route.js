import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { reinstateStaff } from "../../../../../src/users/service";
import * as error from "../../../../../src/lib/errorHandler";

//export const middleware = requireRole(["admin"])

export async function POST(__, {params}){
  const {userId} = params;
  error.handleParamIdError(userId, "user ID")

  try {
    const data = await reinstateStaff(userId)
    return NextResponse.json({data},{status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "reinstating staff")
  }
}