import { NextResponse } from "next/server";
import * as service from "../../../../src/branches/service"
import { getBranchesQuerySchema } from "../../../../src/branches/schema";
import { handleServerErrorWithZod } from "../../../../src/lib/errorHandler";
import { schemaUrlParser } from "../../../../src/lib/schemaParser";


//Fetch all branches
export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const parsed = getBranchesQuerySchema.parse(raw)

    const data = await service.getAllBranches(parsed)
    return NextResponse.json({data}, {status: 201})
  
  } catch (err) {
    return handleServerErrorWithZod(err, "fetching branches")
    
  }

}