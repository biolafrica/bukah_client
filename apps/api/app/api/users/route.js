//import { requireRole } from "@/apps/api/middleware/requireRole";
import { createUserSchema, getUsersQuerySchema } from "../../../src/users/schema";
import * as service from "../../../src/users/service"
import { makeGetListHandler, makePostPayloadHandler } from "../../../src/lib/routeHandlers";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  service.getAllStaffWithBranches,
  getUsersQuerySchema,
  "fetching staff lists"
)

export const POST = makePostPayloadHandler(
  service.addStaff,
  createUserSchema,
  "adding user"
)