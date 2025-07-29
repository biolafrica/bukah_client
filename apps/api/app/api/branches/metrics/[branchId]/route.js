import {getBranchTotals } from "../../../../../src/branches/service";
import { handleServerError } from "../../../../../src/lib/errorHandler";
import { NextResponse } from "next/server";

export async function GET(__, {params}){
  try {
    const {branchId} = await params;
    console.log(branchId)

    const branches = await getBranchTotals(branchId)
    return NextResponse.json({branches}, {status: 201})
    
  } catch (err) {
    return handleServerError(err, "error fetching branch metrics")
  }

}