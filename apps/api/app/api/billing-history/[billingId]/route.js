import { getBillingById } from "../../../../src/billing-history/service";
import { makeGetByIdHandler } from "../../../../src/lib/routeHandlers";

//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "billingId",
  getBillingById,
  "fetching billing"
)