import { updatePOSSchema} from "../../../../src/pos/schema";
import * as helper from "../../../../src/lib/routeHandlers";
import * as service from "../../../../src/pos/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "posId",
  service.getPOSById,
  "fetching pos"
)

export const PUT = helper.makePutByIdHandler(
  "posId",
  service.updatePOS,
  updatePOSSchema,
  "updating pos"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "posId",
  service.deletePOS,
  "deleting pos"
)