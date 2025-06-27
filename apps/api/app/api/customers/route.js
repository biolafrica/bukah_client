import { getCustomersQuerySchema } from "../../../src/customers/schema";
import { getAllCustomersWithCounts } from "../../../src/customers/service";
import { makeGetListHandler } from "../../../src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  getAllCustomersWithCounts,
  getCustomersQuerySchema,
  "fetching customers"
)

//pending countGroup