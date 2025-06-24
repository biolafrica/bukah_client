import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "../../../../../src/branches/service";
import * as error from "../../../../../src/lib/errorHandler";

// export const middleware = requireRole(["admin"])

// Re-open branch
export async function POST(__,{params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch ID")

  try {
    const data = await service.activateBranch(branchId)
    return NextResponse.json({data},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "reactivating branch")
  }


}