import ClientMenuInner from "../../components/pages/menu/clientMenuInner"

export const dynamic = 'force-dynamic'

export default async function MenuPage({ searchParams }) {

  const {
    segment  = 'items',
    search   = '',
    branch   = '',
    category = '',
    name   = '',
    page = '',
  } = await searchParams

  
  //pagination
  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start   = pageIdx * pageSize
  const end     = start + pageSize - 1


  // 2️⃣ build the query URL for products or categories
  const params = new URLSearchParams()
  if (search)params.set('searchTerm', search)

  if (segment==='items') {
    if (branch)   params.set('branchId',   branch)
    if (category) params.set('categoryId', category)
  }

  if (name)params.set('name', name)

  params.set('range', `${start},${end}`)

  const endpoint = segment === 'items' 
    ? '/api/products' 
    : '/api/product-categories'

  // 3️⃣ fetch the table rows
  const rowsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`)
  const rowsJson = await rowsRes.json()
  const tableData = rowsJson.data.data || []
  const totalCount = rowsJson.data.count


  return (

    <ClientMenuInner
      segment={segment}
      search={search}
      filters={{ branch, category }}
      sortConfig={name ? { key: 'name', direction: name } : null}
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
    />

  )
}
