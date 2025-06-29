import { getCustomerOrders } from "../../../../../src/customers/service";
import { NextResponse } from "next/server";
import * as error from "../../../../../src/lib/errorHandler"
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    if(!customerId)return NextResponse.json({error : 'customer ID is required'}, {status : 400})

    const orders = await getCustomerOrders(customerId)
    if(!orders)return NextResponse.json({error : "customer orders not found"}, {status : 404})

    return NextResponse.json({orders}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching customer orders")
  }

}