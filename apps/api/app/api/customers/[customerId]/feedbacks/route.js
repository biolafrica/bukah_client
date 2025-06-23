import { getCustomerFeedbacks } from "../../../../../src/customers/service";
import * as error from "../../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  const {customerId} = params;
  error.handleParamIdError(customerId, "customer ID")

  try {
    const filters = {customer_id : customerId};
    const count = true;
    console.log(filters)

    const feedbacks = await getCustomerFeedbacks({filters, count})
    if(!feedbacks){
      return NextResponse.json({error : "customer feedbacks not found"}, {status : 404})
    }

    return NextResponse.json({feedbacks}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer feedbacks")
    
  }

}