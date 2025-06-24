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
    error.handleFetchByIdError(customer, "customer not found")

    return NextResponse.json({customer},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer")
    
  }
}