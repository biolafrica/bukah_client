import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";
import { createBranchSchema, getBranchesQuerySchema } from "../../../src/branches/schema";
import * as service from "../../../src/branches/service"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler";
import { schemaBodyParser, schemaUrlParser } from "@/apps/api/src/lib/schemaParser";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const { searchTerm, range } = getBranchesQuerySchema.parse(raw)
    
    const data = await service.getAllBranchesWithSupervisor({ searchTerm, range })
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err,"fetching branches")
  }
}

export async function POST(request){
  try {
    const dto = await schemaBodyParser(request, createBranchSchema)

    const data = await service.createBranch(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "creating branch" )
  }
}