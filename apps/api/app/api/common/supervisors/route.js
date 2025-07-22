import { handleServerError } from "../../../../src/lib/errorHandler"
import { fetchSupervisors } from "../../../../src/users/service"
import { NextResponse } from "next/server"

export async function GET(){
  try {
    const data = await fetchSupervisors()
    return NextResponse.json({data}, {status: 201})
  } catch (err) {
    return handleServerError(err, "fetching branches")
    
  }
}