import { handleServerError } from "../../../../src/lib/errorHandler";
import {supabase} from "../../../../../../packages/utils/database/supabaseClient"
import { NextResponse } from "next/server";

export async function POST(request){
  try {
    const payload = await request.json();

    const { error } = await supabase.rpc('create_combo_product', { payload })

    if(error){
      return NextResponse.json({error : error.message}, {status: 400})
    }

    return NextResponse.json({message: "product added successfuly" }, {status:200})
    
  } catch (error) {
    handleServerError(error, "error saving product")
    
  }

}