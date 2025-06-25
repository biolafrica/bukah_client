import * as error from "../../../src/lib/errorHandler";
import { schemaBodyParser } from "../../../src/lib/schemaParser";
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


export async function POST(request){
  try {
    const dto = await schemaBodyParser(request, createTableSchema)

    const data = await addTable(dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "adding table")
    
  }
 
}