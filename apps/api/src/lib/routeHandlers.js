import { NextResponse } from "next/server"
import { handleServerError, handleServerErrorWithZod } from "./errorHandler"
import { schemaBodyParser, schemaUrlParser } from "./schemaParser"


export function makeGetListHandler (fetcher, schema, context){
  return async function GET(request){
    try {
     
      const raw = schemaUrlParser(request)
      const dto = schema.parse(raw)

      const data = await fetcher(dto)
      return NextResponse.json({data}, {status: 201})
      
    } catch (err) {
      return handleServerErrorWithZod(err, `${context}`)
    }
  }
}


export function makePostPayloadHandler(creater, schema, context){
  return async function POST(request){
    try {
      const dto = await schemaBodyParser(request, schema)

      const data = await creater(dto)
      return NextResponse.json({data}, {status: 201})

    } catch (err) {
      return handleServerErrorWithZod(err, `${context}`)
    }
  }
}


export function makeGetByIdHandler(paramName, fetcher, context){
  return async function GET(_, { params }) {
    const ids = await params;
    const id = ids[paramName];
    if (!id) {
      return NextResponse.json(
        { error: `${paramName} is required` },
        { status: 400 }
      )
    }

    try {
      const entity = await fetcher(id)
      if (!entity) {
        return NextResponse.json(
          { error: `${paramName.replace(/Id$/, '')} not found` },
          { status: 404 }
        )
      }

      const key = paramName.replace(/Id$/, '')
      return NextResponse.json({ [key]: entity }, { status: 200 })
    } catch (err) {
      return handleServerError(err, context)
    }
  }
  
}


export function makePutByIdHandler(paramName, creater, schema, context){
  return async function PUT(request, {params}){
    try {
      const ids = await params;
      const id = ids[paramName];
      if (!id) {
        return NextResponse.json(
          { error: `${paramName} is required` },
          { status: 400 }
        )
      }

      const dto = await schemaBodyParser(request, schema)

      const data = await creater(id, dto)
      return NextResponse.json({data}, {status: 201})

    } catch (err) {
      return handleServerErrorWithZod(err, `${context}`)
    }
  }

}


export function makeDeleteByIdHandler(paramName, deleter, context){
  return async function DELETE(_, { params }) {
    try {
      const ids = await params;
      const id = ids[paramName];
      if (!id) {
        return NextResponse.json(
          { error: `${paramName} is required` },
          { status: 400 }
        )
      }

      await deleter(id)
      return NextResponse.json({message : `selected ${paramName} deleted` }, { status: 200 })
      
    } catch (err) {
      return handleServerError(err, context)
      // manage deleting branch with active order in frontend
      
    }
  }

}

