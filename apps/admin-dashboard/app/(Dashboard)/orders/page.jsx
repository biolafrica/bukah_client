import ClientOrderInner from "../../components/pages/orders/clientOrderInner";

export const dynamic = 'force-dynamic'

export default async function Orders({searchParams}){
  const {
    segment  = 'all',
    search   = '',
    branch   = '',
    channel = '',
    dateRange = '',
    sortBy   = '',
    direction= '',
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
  //dateOptions
  //channel option

  const params = new URLSearchParams()
  if (search)    params.set('searchTerm', search)
  if (channel)  params.set('channel',    channel)
  if (dateRange) params.set('dateRange', dateRange)

  if (sortBy)params.set('sortBy',    sortBy)
  if (direction) params.set('direction', direction)
  params.set('range', `${start},${end}`)

  let segments;

  if(segment === "all"){
    segments = 'api/orders' 
  }else if(segment === "preparing"){
    segments = `api/orders?status=preparing` 
  }else if(segment === "completed"){
    segments = `api/orders?status=preparing` 
  }else if (segment === "cancelled"){
    segments = `api/orders?status=cancelled`
  }

  const endpoint = segments;


  const rowsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`)
  const rowsJson = await rowsRes.json()
  const tableData = rowsJson.data.data || []
  const totalCount = rowsJson.data.count

  console.log("data", tableData, "count", totalCount)

  return (
    <ClientOrderInner
      segment={segment}
      search={search}
      branchOptions={branchOptions}
      filters={{branch,channel,dateRange}}
      sortConfig={ sortBy ? { key: sortBy, direction } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  )
}