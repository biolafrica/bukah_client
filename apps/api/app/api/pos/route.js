import { makeGetListNoSchemaHander, makePostPayloadHandler } from "../../../src/lib/routeHandlers";
import { addPOS, getAllPOS } from "../../../src/pos/service";
import { createPOSSchema } from "../../../src/pos/schema";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])


export const GET = makeGetListNoSchemaHander(
  getAllPOS,
  "fetching pos"
)

export const POST = makePostPayloadHandler(
  addPOS,
  createPOSSchema,
  "adding pos device"
)