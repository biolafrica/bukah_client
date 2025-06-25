import * as error from "../../../../src/lib/errorHandler";
import { schemaBodyParser } from "../../../../src/lib/schemaParser";
import { updateTableSchema } from "../../../../src/tables/schema";
import * as service from "../../../../src/tables/service";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(__, {params}){
  try {
    const {tableId} = await params;
    if(!tableId)return NextResponse.json({error : 'table ID is required'}, {status : 400})
    
    const table = await service.getTableById(tableId)
    if(!table)return NextResponse.json({error : "table not found"}, {status : 404})
    
    return NextResponse.json({table},{status : 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching table")
    
  }
}


export async function PUT(request, {params}){
  try {
    const {tableId} = await params;
    if(!tableId)return NextResponse.json({error : 'table ID is required'}, {status : 400})

    const dto = await schemaBodyParser(request, updateTableSchema)

    const data = await service.updateTable(tableId, dto)
    return NextResponse.json({data}, {status: 201})

  } catch (err) {
    return error.handleServerErrorWithZod(err, "updating tables")
  }

}


export async function DELETE(__, {params}){
  try {
    const {tableId} = await params;
    if(!tableId)return NextResponse.json({error : 'table ID is required'}, {status : 400})

    await service.deleteTable(tableId)
    return NextResponse.json({message : "table deleted"}, {status: 201})
      
  } catch (err) {
    return error.handleServerError(err, "deleting table")
    
  }
}