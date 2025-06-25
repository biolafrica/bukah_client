import { handleServerError } from "../../../src/lib/errorHandler"
import { NextResponse } from "next/server"
import {BaseRepository} from "../../../../../packages/utils/database/baseRepository"
//import { requireRole } from "@/apps/api/middleware/requireRole"

const repo = new BaseRepository("restaurant_settings", process.env.NEXT_PUBLIC_RESTAURANT_ID)

//export const middleware = requireRole(["admin", "supervisor"])


export async function GET(){
  try {
    const settings = await repo.findAll()
    if(!settings)return NextResponse.json({error : "settings not found"}, {status : 404})

    return NextResponse.json({settings}, {status: 201})
    
  } catch (err) {
    return handleServerError(err, "fetching settings")
    
  }

}
