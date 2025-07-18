// app/customers/page.jsx (Server Component)

import ClientCustomerInner from "../../components/pages/customers/clientCustomer"


export const dynamic = 'force-dynamic'

export default async function CustomersPage({ searchParams }) {
  const {
    segment     = 'all',  
    search      = '',
    dateRange   = '',
    totalSpent  = '',           
    page        = '0',
  } = await searchParams

  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  // Build shared params
  const params = new URLSearchParams()
  if (segment !== 'all') params.set('type', segment)
  if (search)      params.set('searchTerm', search)
  if (dateRange)   params.set('dateRange', dateRange)
  if (totalSpent)  params.set('totalSpent', totalSpent)
  params.set('range', `${start},${end}`)

  // Fetch main customer list
  const listRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers?${params}`
  )
  const listJson      = await listRes.json()
  const tableData     = listJson.data.data
  const totalCount    = listJson.data.count

  // Fetch top customers by orders/spending
  const topsRes       = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers/tops`
  )
  const topsJson      = await topsRes.json()
  const topOrders     = topsJson.data.most_orders.data
  const topSpenders   = topsJson.data.top_spenders.data


  // Fetch customer metrics
  const metricsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers/metrics`
  )
  const metricsJson  = await metricsRes.json();
  const metric  = metricsJson.data;

  return (
    <ClientCustomerInner
      segment={segment}
      search={search}
      dateRange={dateRange}
      sortConfig={totalSpent ? { key: 'totalSpent', direction: totalSpent } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
      topOrders={topOrders}
      topSpenders={topSpenders}
      metricData={metric}
    />
  )
}
