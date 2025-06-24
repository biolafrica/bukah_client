//import { requireRole } from "@/apps/api/middleware/requireRole";
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler"
import { getAllTransaction } from "../../../src/transactions/service"
import { NextResponse } from "next/server"
import { getTransactionQuerySchema } from "../../../src/transactions/schema"


//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const {
      searchId, 
      branchId, 
      type, 
      method, 
      dateRange, 
      range
    } = getTransactionQuerySchema.parse(raw)

    const data = await getAllTransaction({searchId, branchId, type, method, dateRange, range})
    return NextResponse.json({data},{status: 201})

  } catch (err) {
    return handleServerErrorWithZod(err, "fetching transactions")
  }

}