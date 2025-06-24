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
    error.handleFetchByIdError(transaction, "transaction not found")

    return NextResponse.json({transaction},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching transaction")
  }

}