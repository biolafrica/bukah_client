import { getCustomerOrders } from "../../../../../src/customers/service";
import { NextResponse } from "next/server";
import * as error from "../../../../../src/lib/errorHandler"
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    error.handleParamIdError(customerId, "customer ID")
    
    const filters = {customer_id : customerId};
    const count = true;

    const orders = await getCustomerOrders({filters, count})
    error.handleFetchByIdError(orders,"customer orders not found")

    return NextResponse.json({orders}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer orders")
  }

}