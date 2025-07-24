import { updateTerminalSchema } from "../../../../src/terminals/schema";
import * as helper from "../../../../src/lib/routeHandlers";
import * as service from "../../../../src/terminals/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "terminalId",
  service.getTerminalsById,
  "fetching terminal"
)

export const PUT = helper.makePutByIdHandler(
  "terminalId",
  service.updateTerminals,
  updateTerminalSchema,
  "updating terminal"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "terminalId",
  service.deleteTerminals,
  "deleting terminal"
)
