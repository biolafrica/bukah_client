import {BranchRepository} from "../../../../../../../packages/utils/database/branchRepository";
import { NextResponse } from "next/server"

const branch = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

// Fetch selected branch(details +summary)
export async function GET({params}){
  try {

    const {branchId} = await params;
    console.log("branch_id", branchId)
    if(!branchId){
      return NextResponse.json({error : "invalid branch_id params"}, {status : 401})
    }

    const data = await  branch.findWithSupervisorById(branchId)
    return NextResponse.json({data},{status : 200})

  } catch (error) {

    console.error(`error fetching selected branch `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }
}

// Edit selected branch
export async function PUT(request, {params}){

  try {

    const {branchId} = await params;
    console.log("branch_id", branchId)
    if(!branchId){
      return NextResponse.json({error : "invalid branch_id params"}, {status : 401})
    }

    const branchData = await request.json();
    console.log("branch_data", branchData)
    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status : 402})
    }

    const data = await  branch.update(branchId, branchData)
    return NextResponse.json({data},{status : 200})

  } catch (error) {

    console.error(`error updating selected branch `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})

  }

}

// Delete selected branch
export async function DELETE({params}){
  try {

    const {branchId} = await params;
    console.log("branch_id", branchId)
    if(!branchId){
      return NextResponse.json({error : "invalid branch_id params"}, {status : 401})
    }

    const error = await branch.delete(branchId)
    return NextResponse.json({error},{status : 403})
    
  } catch (error) {

    console.error(`error deleting selected branch `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }

}
