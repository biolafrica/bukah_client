import { z } from "zod"

// reusable schema for range
export const rangeString = z
.string()
.default('0,9')
.refine((s) => /^\d+,\d+$/.test(s), {
  message: 'range must be two integers, e.g. "0,9"',
})


// reusable schema for range and date
const dateRangeTuple = z
.string()
.refine(
  (s) => /^\d{4}-\d{2}-\d{2}\s*,\s*\d{4}-\d{2}-\d{2}$/.test(s),
  {
    message:
      'dateRange must be two dates in YYYY-MM-DD format, e.g. "2025-06-01,2025-06-30"',
  }
)
.transform((s) => {
  const [startStr, endStr] = s.split(',').map((x) => x.trim())
  return { start: new Date(startStr), end: new Date(endStr) }
})
.refine(
  ({ start, end }) => !isNaN(start.getTime()) && !isNaN(end.getTime()),
  { message: 'One or both dates are invalid' }
)
.refine(
  ({ start, end }) => start <= end,
  { message: 'Start date must be before or equal to end date' }
)


export const dateRangeSchema = z
.union([dateRangeTuple, z.null()])
.default(null)