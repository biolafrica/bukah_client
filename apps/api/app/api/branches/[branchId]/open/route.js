import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "../../../../../src/branches/service";
import * as error from "../../../../../src/lib/errorHandler";

// export const middleware = requireRole(["admin"])

// Re-open branch
export async function POST(__,{params}){
  try {
    const {branchId} = await params;
    if(!branchId)return NextResponse.json({error : 'branch ID is required'}, {status : 400})
    
    const data = await service.activateBranch(branchId)
    return NextResponse.json({data},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "reactivating branch")
  }


}