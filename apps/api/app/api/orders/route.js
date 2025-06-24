//import { requireRole } from "@/apps/api/middleware/requireRole";
import { handleServerError } from "../../../src/lib/errorHandler";
import { getOrdersQuerySchema } from "../../../src/orders/schema";
import { getAllOrders } from "../../../src/orders/service";
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
      const {
      searchTerm, 
      branchId, 
      status, 
      channel, 
      dateRange, 
      range
    } = getOrdersQuerySchema.parse(raw)

    const data = await getAllOrders({searchTerm, branchId,status,channel,dateRange, range})
    return NextResponse.json({data},{status: 201})
    
  } catch (err) {
    return handleServerError(err, "fetching orders")
  }

}