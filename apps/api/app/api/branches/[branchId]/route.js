import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { updateBranchSchema } from "../../../../src/branches/schema";
import * as service from "../../../../src/branches/service"
import * as error from "../../../../src/lib/errorHandler";
import { schemaBodyParser } from "@/apps/api/src/lib/schemaParser";


//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(___,{params}){
  try {
    const {branchId} = await params;
    error.handleParamIdError(branchId, "branch ID")

    const branch = await service.getBranchById(branchId)
    error.handleFetchByIdError(branch, "branch not found")

    return NextResponse.json({branch},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching branch")
    
  }
}

export async function PUT(request, {params}){
  const {branchId} = params;
  error.handleParamIdError(branchId, "branch ID")
 
  try {
    const dto = await schemaBodyParser(request, updateBranchSchema)

    const data = await service.updateBranch(branchId, dto);
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating branch")   
  }

}

export async function DELETE(__, {params}){
  const {branchId} = await params;
  error.handleParamIdError(branchId, "branch ID")
 
  try {
    await service.deleteBranch(branchId)
    return NextResponse.json({message : "Branch deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting branch")
    // manage deleting branch with active order in frontend
  }

}