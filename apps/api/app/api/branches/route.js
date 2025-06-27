//import { requireRole } from "@/apps/api/middleware/requireRole";
import { createBranchSchema, getBranchesQuerySchema } from "../../../src/branches/schema";
import * as service from "../../../src/branches/service"
import { makeGetListHandler, makePostPayloadHandler } from "../../../src/lib/routeHandlers";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListHandler(
  service.getAllBranchesWithSupervisor,
  getBranchesQuerySchema,
  "fetching branches"
)

export const POST = makePostPayloadHandler(
  service.createBranch,
  createBranchSchema,
  "creating branch"
)