import { NextResponse } from "next/server";
import * as service from "@/apps/api/src/branches/service"
import { getBranchesQuerySchema } from "@/apps/api/src/branches/schema";
import { handleServerErrorWithZod } from "@/apps/api/src/lib/errorHandler";
import { schemaUrlParser } from "@/apps/api/src/lib/schemaParser";


//Fetch all branches
export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const { searchTerm, range } = getBranchesQuerySchema.parse(raw)

    const data = await service.getAllBranches({ searchTerm, range })
    return NextResponse.json({data}, {status: 201})
  
  } catch (err) {
    return handleServerErrorWithZod(err, "fetching branches")
    
  }

}