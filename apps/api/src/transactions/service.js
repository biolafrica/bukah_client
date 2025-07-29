import { startOfDay, subDays } from "date-fns"
import { repos } from "../lib/repos"


export async function getAllTransaction({
  searchId = "", 
  branch = null, 
  type = null, 
  method = null, 
  dateRange = null, 
  range =[0,9],
  totalAmount = null
}={}){
  const filters = {}
  const orderBy = {}

  if (branch) filters.branch_id = branch
  if (type) filters.transaction_type = type
  if (method) filters.payment_method = method
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  if(totalAmount)orderBy.total_amount = totalAmount

  const search = searchId ? ['reference_id', searchId] : []

  const joins = {
    branch: 'branches(name)',
    order: 'orders(order_code)',
  }

  return repos.transaction.findAll({search,filters,joins, range, orderBy})
}

export async function getTransactionById(transactionId){
  const joins = {
    branch: 'branches(name)',
    order: 'orders(id)',
  }
  return repos.transaction.findById(transactionId, joins)
}

export async function getTransactionMetrics() {
  const todayStart = startOfDay(new Date())

  const buildWindow = (daysBack) => ({
    current:  { from: subDays(todayStart, daysBack), to: todayStart },
    previous: { from: subDays(todayStart, daysBack * 2), to: subDays(todayStart, daysBack) }
  })

  const windows = {
    today: buildWindow(0),
    last7: buildWindow(7),
    last30: buildWindow(30)
  }

  windows.today.current.to = subDays(todayStart, -1)  
  windows.today.previous = {                         
    from: subDays(todayStart, 1),
    to:   todayStart
  }

  const result = {
    'Total Sales': {},
    'Refunded':    {},
    'Net Revenue': {}
  }

  for (const [key, { current, previous }] of Object.entries(windows)) {

    const salesCurr = await repos.transaction.sumColumn({
      table:     'transactions',
      column:    'total_amount',
      dateRange: current
    })
    const salesPrev = await repos.transaction.sumColumn({
      table:     'transactions',
      column:    'total_amount',
      dateRange: previous
    })

    const refundCurr = await repos.transaction.sumColumn({
      table:     'transactions',
      column:    'total_amount',
      dateRange: current,
      filters:   { transaction_type: 'refunded' }
    })

    const refundPrev = await repos.transaction.sumColumn({
      table:     'transactions',
      column:    'total_amount',
      dateRange: previous,
      filters:   { transaction_type: 'refunded' }
    })

    result['Total Sales'][key]   = { current: salesCurr,  previous: salesPrev  }
    result['Refunded'][key]      = { current: refundCurr, previous: refundPrev }
    result['Net Revenue'][key]   = {
      current:  salesCurr  - refundCurr,
      previous: salesPrev  - refundPrev
    }
  }

  return result
}

