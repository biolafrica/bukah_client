import { makeGetListHandler } from "../../../src/lib/routeHandlers";
import { getOrderItemsQuerySchema } from "../../../src/order-items/schema";
import { getOrderAllOrderItems } from "../../../src/order-items/service";

export const GET = makeGetListHandler(
  getOrderAllOrderItems,
  getOrderItemsQuerySchema,
  "fetching order items"
)
