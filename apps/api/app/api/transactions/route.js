//import { requireRole } from "@/apps/api/middleware/requireRole";
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler"
import { getAllTransaction } from "../../../src/transactions/service"
import { NextResponse } from "next/server"
import { getTransactionQuerySchema } from "../../../src/transactions/schema"
import { schemaUrlParser } from "../../../src/lib/schemaParser"


//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
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