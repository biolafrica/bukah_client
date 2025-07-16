import ClientOrderInner from "../../components/pages/orders/clientOrderInner";

export const dynamic = 'force-dynamic'

export default async function Orders({searchParams}){
  const {
    segment  = 'all',
    search   = '',
    branch   = '',
    channel = '',
    dateRange = '',
    price = '',
    page = '',
  } = await searchParams
  
  //pagination
  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start   = pageIdx * pageSize
  const end     = start + pageSize - 1

  const branchRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`);

  const branchesJson = await branchRes.json();
  const branches = branchesJson.data.data;

  const branchOptions = branches.map(b => ({ value: b.id, label: b.name }))


  const params = new URLSearchParams()
  if (segment !== 'all')   params.set('status', segment)
  if (search)    params.set('searchTerm', search)
  if (channel)  params.set('channel',    channel)
  if (dateRange) params.set('dateRange', dateRange)
  if (branch)  params.set('branch', branch)
  if (price) params.set('price', price)

  params.set('range', `${start},${end}`)

  // Fetch paginated orders
  const orderRes  = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders?${params}`
  )

  const orderJson   = await orderRes.json()
  const tableData  = orderJson.data.data
  const totalCount = orderJson.data.count


  // Fetch metrics for orders
  const metricsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/metrics`
  )
  const metricsJson  = await metricsRes.json();
  const metric  = metricsJson.data;


  return (
    <ClientOrderInner
      segment={segment}
      search={search}
      dateRange={dateRange}
      branchOptions={branchOptions}
      filters={{branch, channel, dateRange}}
      sortConfig={ price ? { key: 'price', direction:price } : null}
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
      metricData={metric}
    />
  )
}