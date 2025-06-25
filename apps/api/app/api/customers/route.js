import { schemaUrlParser } from "../../../src/lib/schemaParser";
import { getCustomersQuerySchema } from "../../../src/customers/schema";
import { getAllCustomersWithCounts } from "../../../src/customers/service";
import { handleServerErrorWithZod } from "../../../src/lib/errorHandler";
import { NextResponse } from "next/server";
//import { requireRole } from "@/apps/api/middleware/requireRole";

//export const middleware = requireRole(["admin", "supervisor"])

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const {
      searchTerm, 
      dateRange, 
      range, 
      type
    } = getCustomersQuerySchema.parse(raw)

    const data = await getAllCustomersWithCounts({
      searchTerm,
      dateRange,
      range,
      type
    })
    
    return NextResponse.json({data},{status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "fetching customers")
  
  }

}

//pending countGroup