import { updateSettingsSchema } from "../../../../src/lib/settingsSchema";
import { makePutByIdHandler } from "../../../../src/lib/routeHandlers";
import { updateSettings } from "../../../../src/settings/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";


//export const middleware = requireRole(["admin"])

export const PUT = makePutByIdHandler(
  "settingsId",
  updateSettings,
  updateSettingsSchema,
  "updating settings"
)

