import {handleServerErrorWithZod} from "../../../../src/lib/errorHandler";
import {BaseRepository} from "../../../../../../packages/utils/database/baseRepository"
import { schemaBodyParser } from "../../../../src/lib/schemaParser";
import { NextResponse } from "next/server";
import { updateSettingsSchema } from "../../../../src/lib/settingsSchema";
//import { requireRole } from "@/apps/api/middleware/requireRole";

const repo = new BaseRepository("restaurant_settings", process.env.NEXT_PUBLIC_RESTAURANT_ID)
//export const middleware = requireRole(["admin"])


export async function PUT(request, {params}){
  try {
    const {settingsId} = await params;
    if(!settingsId)return NextResponse.json({error : 'setting ID is required'}, {status : 400})

    const dto = await schemaBodyParser(request,updateSettingsSchema)

    const data = await repo.update(settingsId, dto)
    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return handleServerErrorWithZod(err, "updating settings")
  }

}

