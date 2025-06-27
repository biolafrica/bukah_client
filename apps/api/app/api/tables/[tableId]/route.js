import * as helper from "../../../../src/lib/routeHandlers";
import { updateTableSchema } from "../../../../src/tables/schema";
import * as service from "../../../../src/tables/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "tableId",
  service.getTableById,
  "fetching table"
)

export const PUT = helper.makePutByIdHandler(
  "tableId",
  service.updateTable,
  updateTableSchema,
  "updating table"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "tableId",
  service.deleteTable,
  "deleting table"
)
