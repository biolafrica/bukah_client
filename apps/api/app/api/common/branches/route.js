import {BranchRepository} from "../../../../../../packages/utils/database/branchRepository";
import { NextResponse } from "next/server"

const branch = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

//Fetch all branches
export async function GET(request){
  try {

    const branchData = await request.json();
    console.log("branch_data", branchData)
    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status : 402})
    }

    const data = await  branch.findAll(branchData)
    return NextResponse.json({data}, {status : 200})
  
  } catch (error) {
      
    console.error(`error fetching all branches `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }

}