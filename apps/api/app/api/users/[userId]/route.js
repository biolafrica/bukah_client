import * as error from "../../../../src/lib/errorHandler";
import { updateUserSchema } from "../../../../src/users/schema";
import * as service from "../../../../src/users/service"
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  const {userId} = params;
  error.handleParamIdError(userId, "user ID")

  try {
    const user = await service.getStaffById(userId)
    if(!user){
      return NextResponse.json({error : "user not found"}, {status : 404})
    }

    return NextResponse.json({user},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching user")
  }
}


export async function PUT(request, {params}){
  const {userId} = params;
  error.handleParamIdError(userId, "user ID")

  try {
    const body = await request.json();
    const dto = updateUserSchema.parse(body)

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