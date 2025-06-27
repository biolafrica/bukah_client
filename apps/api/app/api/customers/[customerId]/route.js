import { makeGetByIdHandler } from "../../../../src/lib/routeHandlers";
import { getCustomerById } from "../../../../src/customers/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "customerId",
  getCustomerById,
  "fetching customer"
)