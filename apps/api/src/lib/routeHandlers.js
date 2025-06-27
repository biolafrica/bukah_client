import { NextResponse } from "next/server"
import { handleServerErrorWithZod } from "./errorHandler"
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

