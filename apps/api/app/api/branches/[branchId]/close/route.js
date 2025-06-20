import { NextResponse } from "next/server";
import { requireRole } from "@/apps/api/middleware/requireRole";
import * as service from "@/apps/api/src/branches/service"

export const middleware = requireRole(["admin", "supervisor"])

// Close branch
export async function POST({params}){
  const {branchId} = params;
  if(!branchId){
    return NextResponse.json({error : "Branch ID required"}, {status : 400})
  }

  try {

    const data = await service.deactivateBranch(branchId)
    return NextResponse.json({data},{status : 201})
    
  } catch (err) {

    console.err(`error deactivating branch `, err.message)
    return NextResponse.json({error : "Internal server error"}, {status : 500})
    
  }


}