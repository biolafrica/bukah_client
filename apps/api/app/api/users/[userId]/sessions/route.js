import { makeGetByIdHandler } from "../../../../../src/lib/routeHandlers";
import { getStaffSessions } from "../../../../../src/users/service";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetByIdHandler(
  "userId",
  getStaffSessions,
  'fetching staff sessions'

)