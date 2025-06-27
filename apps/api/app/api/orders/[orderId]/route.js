import { getOrderbyId } from "../../../../src/orders/service";
import { makeGetByIdHandler } from "@/apps/api/src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "orderId",
  getOrderbyId,
  "fetching order"
)