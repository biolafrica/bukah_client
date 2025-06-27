import { updateUserSchema } from "../../../../src/users/schema";
import * as service from "../../../../src/users/service"
import * as helper from "../../../src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "userId",
  service.getStaffById,
  "fetching user"
)

export const PUT = helper.makePutByIdHandler(
  "userId",
  service.updateStaffDetails,
  updateUserSchema,
  "updating user"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "userId",
  service.deleteStaff,
  "deleting user"
)