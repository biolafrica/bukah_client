//import { requireRole } from "@/apps/api/middleware/requireRole";
import { schemaUrlParser } from "../../../src/lib/schemaParser";
import { handleServerError } from "../../../src/lib/errorHandler";
import { getOrdersQuerySchema } from "../../../src/orders/schema";
import { getAllOrders } from "../../../src/orders/service";
import { NextResponse } from "next/server";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
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