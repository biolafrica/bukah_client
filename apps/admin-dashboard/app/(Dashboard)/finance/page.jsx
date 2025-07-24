import ClientFinanceInner from "../../components/pages/finance/clientFinaceInner"

export const dynamic = 'force-dynamic'

export default async function FinancePage({ searchParams }) {
  const {
    segment     = 'all',
    searchId    = '',
    dateRange   = '', 
    branch      = '',
    method      = '', 
    totalAmount = '', 
    page        = '0',
  } = await searchParams;


  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1


  //Query params
  const params = new URLSearchParams()
  if (segment !== 'all')   params.set('type', segment)
  if (searchId)            params.set('searchId', searchId)
  if (dateRange)           params.set('dateRange', dateRange)
  if (branch)              params.set('branch', branch)
  if (method)              params.set('method', method)
  if (totalAmount)         params.set('totalAmount', totalAmount)
  params.set('range', `${start},${end}`)

  // Fetch paginated transactions
  const txRes    = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transactions?${params}`
  )
  const txJson   = await txRes.json()
  const tableData  = txJson.data.data
  const totalCount = txJson.data.count

  // Fetch metrics for transactions
  const metricsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/metrics`
  )
  const metricsJson  = await metricsRes.json();
  const metric  = metricsJson.data;


  return (
    <ClientFinanceInner
      segment={segment}
      searchId={searchId}
      filters={{ branch, method }}
      sortConfig={ totalAmount ? { key: 'totalAmount', direction: totalAmount } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
      metricData={metric}
    />
  )
}
