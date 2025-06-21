import { NextResponse } from "next/server";
import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "@/apps/api/src/branches/service"
import * as error from "@/apps/api/src/lib/errorHandler";

export const middleware = requireRole(["admin", "supervisor"])

// Close branch
export async function POST({params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch id")
 
  try {
    const data = await service.deactivateBranch(branchId)
    return NextResponse.json({data},{status : 201})
    
  } catch (err) {
    error.handleServerError(err, "deactivating branch" )
    
  }
}