import { makeGetListNoSchemaHander, makePostPayloadHandler } from "../../../src/lib/routeHandlers";
import { createTerminalSchema } from "../../../src/terminals/schema";
import { addTerminals, getAllTerminals } from "../../../src/terminals/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListNoSchemaHander(
  getAllTerminals,
  "fetching terminals"
)

export const POST = makePostPayloadHandler(
  addTerminals,
  createTerminalSchema,
  "adding terminal device"
)