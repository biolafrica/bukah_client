import { getOrderFeedback } from "../../../../../src/orders/service";
import { makeGetByIdHandler } from "../../../../../src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "orderId",
  getOrderFeedback,
  "fetching order feedback"
)