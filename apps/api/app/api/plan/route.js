import { getPlan } from "../../../src/plan/service";
import { makeGetListNoSchemaHander,} from "../../../src/lib/routeHandlers";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export const GET = makeGetListNoSchemaHander(
  getPlan,
  "fetching restaurant plan"
)
