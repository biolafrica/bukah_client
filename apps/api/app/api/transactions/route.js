//import { requireRole } from "@/apps/api/middleware/requireRole";
import { getAllTransaction } from "../../../src/transactions/service"
import { getTransactionQuerySchema } from "../../../src/transactions/schema"
import { makeGetListHandler } from "../../../src/lib/routeHandlers"


//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  getAllTransaction,
  getTransactionQuerySchema,
  "fetching transactions"
)