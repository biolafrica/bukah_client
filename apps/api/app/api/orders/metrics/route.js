import { handleServerError } from "../../../../src/lib/errorHandler"
import { getOrderMetrics } from "../../../../src/orders/service"
import { NextResponse } from "next/server"

export async function GET(){
  try {
    const data = await getOrderMetrics()
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerError(err, "error fetching transaction metrics")
  }

}