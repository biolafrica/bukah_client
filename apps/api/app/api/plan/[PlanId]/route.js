import { changePlan } from "../../../../src/plan/service";
import { makePutByIdHandler } from "../../../../src/lib/routeHandlers";
import { updatePlanSchema } from "../../../../src/plan/schema";

//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const PUT = makePutByIdHandler(
  "planId",
  changePlan,
  updatePlanSchema,
  "updating plan"
)