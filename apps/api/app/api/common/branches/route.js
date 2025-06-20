import { NextResponse } from "next/server";
import * as service from "@/apps/api/src/branches/service"
import { getBranchesQuerySchema } from "@/apps/api/src/branches/schema";
import { ZodError } from "zod";


//Fetch all branches
export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const query = getBranchesQuerySchema.parse(raw)

    const data = await service.getAllBranches(query)
    return NextResponse.json({data}, {status: 201})
  
  } catch (err) {

    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors },{ status: 400 })
    }
  
    console.error("Error fetching branches", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    
  }

}