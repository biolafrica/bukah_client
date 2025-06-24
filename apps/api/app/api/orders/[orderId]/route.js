import { getOrderbyId } from "../../../../src/orders/service";
import * as error from "../../../../src/lib/errorHandler"
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {orderId} = await params;
    error.handleParamIdError(orderId, "order ID")

    const order = await getOrderbyId(orderId)
    error.handleFetchByIdError(order, "order not found")

    return NextResponse.json({transaction},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching order")
  }

}