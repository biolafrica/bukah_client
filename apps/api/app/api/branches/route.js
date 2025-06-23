import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { createBranchSchema, getBranchesQuerySchema } from "../../../src/branches/schema";
import * as service from "../../../src/branches/service"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const { searchTerm, range } = getBranchesQuerySchema.parse(raw)
    
    const data = await service.getAllBranchesWithSupervisor({ searchTerm, range })
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err,"fetching branches")
  }
}

export async function POST(request){
  try {
    const body = await request.json()
    const dto = createBranchSchema.parse(body)

    const data = await service.createBranch(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "creating branch" )
  }
}