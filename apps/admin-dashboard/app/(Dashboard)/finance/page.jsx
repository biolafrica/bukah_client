import ClientFinanceInner from "../../components/pages/finance/clientFinaceInner"
import { formatNaira } from "../../utils/format";


export const dynamic = 'force-dynamic'

export default async function FinancePage({ searchParams }) {
  const {
    segment     = 'all',      // 'all' | 'successful' | 'pending' | 'refund'
    searchId    = '',
    dateRange   = '',         // 'YYYY-MM-DD,YYYY-MM-DD'
    branch      = '',         // branchId
    method      = '',         // 'cash' | 'transfer' | 'card'
    totalAmount = '',         // 'ascending' | 'descending'
    page        = '0',
  } = await searchParams;

  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  // Fetch branch options
  const branchesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`
  )
  const branchesJson   = await branchesRes.json()
  const branches = branchesJson.data.data;
  const branchOptions  = branches.map(b => ({ value: b.id, label: b.name }))

  // Prepare query params for transactions
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
  {/*const metricsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/metrics`
  )
  const metricsJson  = await metricsRes.json()
  const metrics      = metricsJson.data */}
  const metrics = [
    { label: 'Total Sales', value: formatNaira(125500000), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
    { label: 'Registered', value: formatNaira(1300000), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
    { label: 'Net Revenue', value: formatNaira(124200000), percentage: '-3.50%', comparison: 'vs last month', trend: 'up' },
  ]

  return (
    <ClientFinanceInner
      segment={segment}
      searchId={searchId}
      dateRange={dateRange}
      filters={{ branch, method }}
      sortConfig={ totalAmount ? { key: 'totalAmount', direction: totalAmount } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
      branchOptions={branchOptions}
      metrics={metrics}
    />
  )
}
