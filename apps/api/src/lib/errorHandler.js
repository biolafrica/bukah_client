import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleServerErrorWithZod(err, context) {
  if (err instanceof ZodError) {
    console.error(`Validation error ${context}:`, err.errors)
    return NextResponse.json(
      { error: err.errors },
      { status: 400 }
    )
  }

  handleServerError(err, context)
}

export function handleServerError(err, context) {
  console.error(`Unexpected error ${context}:`, err.message || err)
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  )
}

export function handleParamIdError(branchId, context){
  if(!branchId){
    return NextResponse.json({error : `${context} is required`}, {status : 400})
  }
}