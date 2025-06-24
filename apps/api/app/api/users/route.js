//import { requireRole } from "@/apps/api/middleware/requireRole";
import { NextResponse } from "next/server";
import { createUserSchema, getUsersQuerySchema } from "../../../src/users/schema";
import * as service from "../../../src/users/service"
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler";
import { schemaBodyParser, schemaUrlParser } from "@/apps/api/src/lib/schemaParser";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const {searchTerm, role, range, isActive} = getUsersQuerySchema.parse(raw)

    const data = await service.getAllStaffWithBranches({searchTerm, role, range, isActive})
    return NextResponse.json({data}, {status: 201})

  } catch (err) {
    return handleServerErrorWithZod(err, "fetching staff lists")
  }
}

export async function POST(request){
  try {
    const dto = await schemaBodyParser(request, createUserSchema)

    const data = await service.addStaff(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "adding user")
  }
}