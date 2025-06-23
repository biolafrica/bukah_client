//import { requireRole } from "@/apps/api/middleware/requireRole";
import { NextResponse } from "next/server";
import { createUserSchema, getUsersQuerySchema } from "../../../src/users/schema";
import * as service from "../../../src/users/service"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const {searchTerm, role, searchId, range, isActive} = getUsersQuerySchema.parse(raw)

    const data = await service.getAllStaffWithBranches({searchTerm, role, searchId, range, isActive})
    return NextResponse.json({data}, {status: 201})

  } catch (err) {
    return handleServerErrorWithZod(err, "fetching staff lists")
  }
}

export async function POST(request){
  try {
    const body = await request.json()
    const dto = createUserSchema.parse(body)

    const data = await service.addStaff(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "adding user")
  }
}