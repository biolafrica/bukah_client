import { getCustomerById } from "../../../../src/customers/service";
import * as error  from "../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    error.handleParamIdError(customerId, "customer ID")

    const customer = await getCustomerById(customerId)
    if(!customer){
      return NextResponse.json({error : "customer not found"}, {status : 404})
    }

    return NextResponse.json({customer},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer")
    
  }
}