import { schemaBodyParser } from "@/apps/api/src/lib/schemaParser";
import * as error from "../../../../src/lib/errorHandler";
import { updateUserSchema } from "../../../../src/users/schema";
import * as service from "../../../../src/users/service"
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {userId} = await params;
    error.handleParamIdError(userId, "user ID")

    const user = await service.getStaffById(userId)
    error.handleFetchByIdError(user, "user not found")

    return NextResponse.json({user},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching user")
  }
}


export async function PUT(request, {params}){
  const {userId} = params;
  error.handleParamIdError(userId, "user ID")

  try {
    const dto = await schemaBodyParser(request, updateUserSchema)

    const data = await service.updateStaffDetails(userId, dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating user")
    
  }

}


export async function DELETE(__, {params}){
  const {userId} = params;
  error.handleParamIdError(userId, "user ID")

  try {
    await service.deleteStaff(userId)
    return NextResponse.json({message : "user deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting user")
  }

  //constraint
}