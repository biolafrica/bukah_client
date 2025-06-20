import {BranchRepository} from "../../../../../../../../packages/utils/database/branchRepository";
import { NextResponse } from "next/server"

const branch = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

// Re-open selected branch
export async function POST({params}){
  try {
    const {branchId} = await params;
    console.log("branch_id", branchId)
    if(!branchId){
      return NextResponse.json({error : "invalid branch_id params"}, {status : 401})
    }

    const data = await  branch.reactivate(branchId)
    return NextResponse.json({data},{status : 200})

  } catch (error) {

    console.error(`error reactivating selected branch `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }
}