import {BaseRepository} from "../../../../../../packages/utils/database/baseRepository"
import { updateSettingsSchema } from "../../../../src/lib/settingsSchema";
import { makePutByIdHandler } from "../../../../src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

const repo = new BaseRepository("restaurant_settings", process.env.NEXT_PUBLIC_RESTAURANT_ID)
//export const middleware = requireRole(["admin"])

export const PUT = makePutByIdHandler(
  "settingsId",
  repo.update,
  updateSettingsSchema,
  "updating settings"
)

