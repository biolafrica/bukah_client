import { NextResponse } from "next/server";
import { handleServerError} from "../../../../src/lib/errorHandler";
import { getTopSellingStaff } from "../../../../src/users/service";

export async function GET(){
  try {
    const data = await getTopSellingStaff()
    return NextResponse.json({data}, {status: 201})
  } catch (err) {
    return handleServerError(err, "fetching top staff")
  }
}