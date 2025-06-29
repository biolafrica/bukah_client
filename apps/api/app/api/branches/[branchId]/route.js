//import { requireRole } from "@/apps/api/middleware/requireRole";
import { updateBranchSchema } from "../../../../src/branches/schema";
import * as service from "../../../../src/branches/service"
import * as helper from "../../../../src/lib/routeHandlers";


//export const middleware = requireRole(["admin", "supervisor"])

export const GET = helper.makeGetByIdHandler(
  "branchId",
  service.getBranchById,
  "fetching branch"
)

export const PUT = helper.makePutByIdHandler(
  "branchId",
  service.updateBranch,
  updateBranchSchema,
  "updating branch"
)

export const DELETE = helper.makeDeleteByIdHandler(
  "branchId",
  service.deleteBranch,
  "deleting branch"
)