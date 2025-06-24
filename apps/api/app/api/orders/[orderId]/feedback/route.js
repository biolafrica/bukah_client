import { getOrderFeedback } from "../../../../../src/orders/service";
import * as error from "../../../../../src/lib/errorHandler"
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {orderId} = await params;
    error.handleParamIdError(orderId, "order ID")

    const feedback = await getOrderFeedback(orderId)
    error.handleFetchByIdError(feedback, "order feedback not found")

    return NextResponse.json({feedback},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching order feedback")
  }

}