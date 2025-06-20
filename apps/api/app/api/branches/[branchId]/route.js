import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireRole } from "@/apps/api/middleware/requireRole";
import { updateBranchSchema } from "@/apps/api/src/branches/schema";
import * as service from "@/apps/api/src/branches/service"

export const middleware = requireRole(["admin", "supervisor"])

export async function GET({params}){

  const {branchId} = params;
  if(!branchId){
    return NextResponse.json({error : "branch id is required"}, {status : 400})
  }

  try {

    const branch = await service.getBranchById(branchId)
    if(!branch){
      return NextResponse.json({error : "branch not found"}, {status : 404})
    }

    return NextResponse.json({branch},{status : 201})
    
  } catch (err) {

    console.error("Error fetching branch", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    
  }
}


export async function PUT(request, {params}){

  const {branchId} = params;
  if(!branchId){
    return NextResponse.json({error : "branch id is required"}, {status : 400})
  }

  try {

    const body = await request.json();
    const dto = updateBranchSchema.parse(body);

    const data = await service.updateBranch(branchId, dto);
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {

    if(err instanceof ZodError){
      return NextResponse.json({error: err.errors}, {status:400})
    }
    console.error("Error updating branch", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    
  }

}


export async function DELETE({params}){

  const {branchId} = params;
  if(!branchId){
    return NextResponse.json({error : "branch id is required"}, {status : 400})
  }

  try {
    await service.deleteBranch(branchId)
    return NextResponse.json({message : "Branch deleted"}, {status: 201})
    
  } catch (err) {

    console.error("Error deleting branch", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    
  }

}