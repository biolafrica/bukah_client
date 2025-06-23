import { getAllTopCustomers } from "../../../../src/customers/service";
import { handleServerError } from "../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const data = await getAllTopCustomers()
    return NextResponse.json({data},{status: 201})
 
  } catch (err) {
    return handleServerError(err, 'fetching top customers') 
  }
}