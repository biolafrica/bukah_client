import { getCustomerMetrics } from "../../../../src/customers/service"
import { handleServerError } from "../../../../src/lib/errorHandler"
import { NextResponse } from "next/server"

export async function GET(_,req){
  try {
    const data = await getCustomerMetrics()
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerError(err, "error fetching customer metrics")
  }

}