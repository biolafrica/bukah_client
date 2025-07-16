import { handleServerError } from "../../../../src/lib/errorHandler";
import { getTransactionMetrics } from "../../../../src/transactions/service";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const data = await getTransactionMetrics()
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerError(err, "error fetching transaction metrics")
  }

}