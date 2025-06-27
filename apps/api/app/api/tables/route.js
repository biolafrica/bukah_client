import { makePostPayloadHandler } from "../../../src/lib/routeHandlers";
import * as error from "../../../src/lib/errorHandler";
import { createTableSchema } from "../../../src/tables/schema";
import { addTable, getAllTables } from "../../../src/tables/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(){
  try {
    const data = await getAllTables({count:true})
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching tables")
  }
}

export const POST = makePostPayloadHandler(
  addTable,
  createTableSchema,
  "adding table"
)