import {BranchRepository} from "../../../../../../packages/utils/database/branchRepository";
import { NextResponse } from "next/server"

const branch = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

//Fetch all branches and its supervisor details
export async function GET(request){

  try {

    const branchData = await request.json();
    console.log("branch_data", branchData)
    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status : 402})
    }

    const data = await  branch.findAllWithSupervisor(branchData)
    return NextResponse.json({data},{status : 200})
  
  } catch (error) {
      
    console.error(`error fetching all branches with FK `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }
}

//Add branch
export async function POST(request){

  try {

    const branchData = await request.json();
    console.log("branch_data", branchData)
    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status : 402})
    }

    const data = await  branch.create(branchData)
    return NextResponse.json({data},{status : 200})
  
  } catch (error) {
      
    console.error(`error adding branch `, error.message)
    return NextResponse.json({error : "server error"}, {status : 500})
    
  }
}