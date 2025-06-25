import { getOrderFeedback } from "../../../../../src/orders/service";
import * as error from "../../../../../src/lib/errorHandler"
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {orderId} = await params;
    if(!orderId)return NextResponse.json({error : 'order ID is required'}, {status : 400})

    const feedback = await getOrderFeedback(orderId)
    if(!feedback)return NextResponse.json({error : "order feedback not found"}, {status : 404})

    return NextResponse.json({feedback},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching order feedback")
  }

}