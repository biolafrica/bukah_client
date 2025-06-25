import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { updateBranchSchema } from "../../../../src/branches/schema";
import * as service from "../../../../src/branches/service"
import * as error from "../../../../src/lib/errorHandler";
import { schemaBodyParser } from "../../../../src/lib/schemaParser";


//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(___,{params}){
  try {
    const {branchId} = await params;
    if(!branchId)return NextResponse.json({error : 'branch ID is required'}, {status : 400})
 
    const branch = await service.getBranchById(branchId)
    if(!branch)return NextResponse.json({error : "brand not found"}, {status : 404})

    return NextResponse.json({branch},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching branch")
    
  }
}

export async function PUT(request, {params}){
  try {
    const {branchId} = await params;
    if(!branchId)return NextResponse.json({error : 'branch ID is required'}, {status : 400})

    const dto = await schemaBodyParser(request, updateBranchSchema)

    const data = await service.updateBranch(branchId, dto);
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating branch")   
  }

}

export async function DELETE(__, {params}){
  try {
    const {branchId} = await params;
    if(!branchId)return NextResponse.json({error : 'branch ID is required'}, {status : 400})

    await service.deleteBranch(branchId)
    return NextResponse.json({message : "Branch deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting branch")
    // manage deleting branch with active order in frontend
  }

}