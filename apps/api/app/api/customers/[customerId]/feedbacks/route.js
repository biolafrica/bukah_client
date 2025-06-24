import { getCustomerFeedbacks } from "../../../../../src/customers/service";
import * as error from "../../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    error.handleParamIdError(customerId, "customer ID")

    const filters = {customer_id : customerId};
    const count = true;

    const feedbacks = await getCustomerFeedbacks({filters, count})
    error.handleFetchByIdError(feedbacks, "customer feedbacks not found")
   
    return NextResponse.json({feedbacks}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer feedbacks")
    
  }

}