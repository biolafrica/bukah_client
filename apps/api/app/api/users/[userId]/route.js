import { schemaBodyParser } from "../../../../src/lib/schemaParser";
import * as error from "../../../../src/lib/errorHandler";
import { updateUserSchema } from "../../../../src/users/schema";
import * as service from "../../../../src/users/service"
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})

    const user = await service.getStaffById(userId)
    if(!user)return NextResponse.json({error : "user not found"}, {status : 404})

    return NextResponse.json({user},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching user")
  }
}


export async function PUT(request, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})
  
    const dto = await schemaBodyParser(request, updateUserSchema)

    const data = await service.updateStaffDetails(userId, dto)
    return NextResponse.json({message : "user updated successfully"}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating user")
    
  }

}


export async function DELETE(__, {params}){
  try {
    const {userId} = await params;
    if(!userId)return NextResponse.json({error : 'user ID is required'}, {status : 400})
  

    await service.deleteStaff(userId)
    return NextResponse.json({message : "user deleted"}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "deleting user")
  }

  //constraint
}