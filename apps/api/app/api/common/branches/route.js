import { NextResponse } from "next/server";
import * as service from "@/apps/api/src/branches/service"
import { getBranchesQuerySchema } from "@/apps/api/src/branches/schema";
import { handleServerErrorWithZod } from "@/apps/api/src/lib/errorHandler";


//Fetch all branches
export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const { searchTerm, range } = getBranchesQuerySchema.parse(raw)

    const data = await service.getAllBranches({ searchTerm, range })
    return NextResponse.json({data}, {status: 201})
  
  } catch (err) {
    handleServerErrorWithZod(err, "fetching branches")
    
  }

}