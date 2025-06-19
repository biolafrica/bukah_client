import { NextResponse } from "next/server";
import { BranchRepository } from "../../../../../../packages/utils/database/branchRepository";
import { UserRepository } from "../../../../../../packages/utils/database/userRepository";

const branch = new BranchRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)
const user = new UserRepository(process.env.NEXT_PUBLIC_RESTAURANT_ID)

export async function GET(){
  try { 
    const id = "a0bd9971-8d9f-4df7-a87d-6599502ba5b8";
    const userList = await branch.findWithSupervisorById(id)

    return NextResponse.json({userList}, {status:200})
    
  } catch (error) {
    console.error("error fetching user", error.message)
    return NextResponse.json({error : "server error"}, {status :500})
  }

}

export async function POST(request){
  
  try { 

    const branchData = await request.json();

    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status :400})
    }

    //const id = "408df6f2-2e49-4529-b065-f32e042a522d";
    const data = await branch.create(branchData)

    return NextResponse.json({data}, {status:200})
    
  } catch (error) {
    console.error("error adding branch", error.message)
    return NextResponse.json({error : "server error"}, {status :500})
  }

}

export async function PATCH(request){
  
  try { 
    const branchData = await request.json();
    console.log(branchData);

    if(!branchData){
      return NextResponse.json({error : "invalid branch data"}, {status :400})
    }

    const id = "50d71bc4-fbfa-4bf0-9486-1173b186fcd6";
    const data = await branch.update(id, branchData)

    return NextResponse.json({data}, {status:200})
    
  } catch (error) {
    console.error("error adding branch", error.message)
    return NextResponse.json({error : "server error"}, {status :500})
  }

}

export async function DELETE(){
  
  try { 
    const id = "50d71bc4-fbfa-4bf0-9486-1173b186fcd6";
    const data = await branch.delete(id)

    return NextResponse.json({data}, {status:200})
    
  } catch (error) {
    console.error("error adding branch", error.message)
    return NextResponse.json({error : "server error"}, {status :500})
  }

}