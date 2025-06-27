//import { requireRole } from "@/apps/api/middleware/requireRole";
import { getOrdersQuerySchema } from "../../../src/orders/schema";
import { getAllOrders } from "../../../src/orders/service";
import { makeGetListHandler } from "../../../src/lib/routeHandlers";


//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  getAllOrders,
  getOrdersQuerySchema,
  "fetching orders"
)