import { NextResponse } from "next/server";
import { requireRole } from "@/apps/api/middleware/requireRole";
import { updateBranchSchema } from "@/apps/api/src/branches/schema";
import * as service from "@/apps/api/src/branches/service"
import * as error from "@/apps/api/src/lib/errorHandler";


export const middleware = requireRole(["admin", "supervisor"])

export async function GET({params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch id")

  try {
    const branch = await service.getBranchById(branchId)
    if(!branch){
      return NextResponse.json({error : "branch not found"}, {status : 404})
    }

    return NextResponse.json({branch},{status : 201})
    
  } catch (err) {
    error.handleServerError(err, "fetching branch")
    
  }
}


export async function PUT(request, {params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch id")
 
  try {
    const body = await request.json();
    const dto = updateBranchSchema.parse(body);

    const data = await service.updateBranch(branchId, dto);
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    error.handleServerErrorWithZod(err, "updating branch")   
  }

}


export async function DELETE({params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch id")
 
  try {
    await service.deleteBranch(branchId)
    return NextResponse.json({message : "Branch deleted"}, {status: 201})
    
  } catch (err) {
    error.handleServerError(err, "deleting branch")
  }

}