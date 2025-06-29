import { getCustomerFeedbacks } from "../../../../../src/customers/service";
import * as error from "../../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    if(!customerId)return NextResponse.json({error : 'customer ID is required'}, {status : 400})

    const feedbacks = await getCustomerFeedbacks(customerId)
    if(!feedbacks)return NextResponse.json({error : "customer feedbacks not found"}, {status : 404})
   
    return NextResponse.json({feedbacks}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer feedbacks")
    
  }

}