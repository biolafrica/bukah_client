import { z } from "zod"
import { rangeString, dateRangeSchema } from "./commonSchema"

export function makeQuerySchema(shape, opts = {}) {
  //endpoint specific field + pagination + dateRange(optional)
  const rawSchema = z.object({
    ...shape,
    range: rangeString,
    ...(opts.withDateRange ? { dateRange: dateRangeSchema } : {}),
  })

  const parsed = rawSchema.transform((obj)=>{
    const [start, end] = obj.range
    .split(",")
    .map((n) => parseInt(n, 10))
    return{
      ...obj,
      range:[start, end]
    }

  })

  return parsed.refine((q)=>
    Number.isInteger(q.range[0]) &&
    Number.isInteger(q.range[1]) &&
    q.range[0] >= 0 &&
    q.range[1] > q.range[0],
    {message : "range must be two non-negative ints with end > start", path: ['range']}
  )

 
}