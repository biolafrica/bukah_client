import { NextResponse } from "next/server";
import {ZodError} from "zod";
import { requireRole } from "@/apps/api/middleware/requireRole";
import { createBranchSchema, getBranchesQuerySchema } from "@/apps/api/src/branches/schema";
import * as service from "@/apps/api/src/branches/service"

export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {

    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const query = getBranchesQuerySchema.parse(raw)

    const data = await service.getAllBranchesWithSupervisor(query)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {

    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors },{ status: 400 })
    }

    console.error("Error fetching branches", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})

  }
}


export async function POST(request){
  try {

    const body = await request.json()
    const dto = createBranchSchema.parse(body)

    const data = await service.createBranch(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {

    if(err instanceof ZodError){
      return NextResponse.json({error: err.errors}, {status:400})
    }
    console.error("Error creating branch", err.message)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})

  }
}