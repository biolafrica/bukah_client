import { NextResponse } from "next/server";
import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "@/apps/api/src/branches/service";

export const middleware = requireRole(["admin", "supervisor"])

// Re-open branch
export async function POST({params}){
  const {branchId} = params;
  if(!branchId){
    return NextResponse.json({error : "Branch ID required"}, {status : 400})
  }

  try {

    const data = await service.activateBranch(branchId)
    return NextResponse.json({data},{status : 201})
    
  } catch (err) {

    console.err(`error reactivating branch `, err.message)
    return NextResponse.json({error : "Internal server error"}, {status : 500})
    
  }


}