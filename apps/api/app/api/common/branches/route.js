import { NextResponse } from "next/server";
import * as service from "../../../../src/branches/service"
import { handleServerError} from "../../../../src/lib/errorHandler";


//Fetch all branches name and ID
export async function GET(){
  try {
    const data = await service.getAllBranches()
    return NextResponse.json({data}, {status: 201})
  } catch (err) {
    return handleServerError(err, "fetching branches")
    
  }
}