import * as error from "../../../../src/lib/errorHandler";
import { getTransactionById } from "../../../../src/transactions/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";


//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {transactionId} = await params;
    error.handleParamIdError(transactionId, "transaction ID")

    const transaction = await getTransactionById(transactionId)
    if(!transaction){
      return NextResponse.json({error : "transaction not found"}, {status : 404})
    }

    return NextResponse.json({transaction},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching transaction")
  }

}