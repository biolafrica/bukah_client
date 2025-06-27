import { makeGetByIdHandler } from "../../../../src/lib/routeHandlers";
import { getTransactionById } from "../../../../src/transactions/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";


//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "transactionId",
  getTransactionById,
  "fetching transaction"
)