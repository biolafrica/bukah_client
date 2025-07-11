import ClientMenuInner from "../../components/pages/menu/innerConsumer"

export const dynamic = 'force-dynamic'

export default async function MenuPage({ searchParams }) {

  const {
    segment  = 'items',
    search   = '',
    branch   = '',
    category = '',
    sortBy   = '',
    direction= '',
    page = '',
  } = await searchParams

  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start   = pageIdx * pageSize
  const end     = start + pageSize - 1


  const [branchesRes, catsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/branches`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product-categories`),
  ])

  const [branchesJson, catsJson] = await Promise.all([
    branchesRes.json(),
    catsRes.json(),
  ])

  const [branches, categories] = [branchesJson.data.data, catsJson.data.data]

  const branchOptions = branches.map(b => ({ value: b.id, label: b.name }))
  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }))

  // 2️⃣ build the query URL for products or categories
  const params = new URLSearchParams()
  if (search)    params.set('searchTerm', search)

  if (segment==='items') {
    if (branch)   params.set('branchId',   branch)
    if (category) params.set('categoryId', category)
  }

  if (sortBy)params.set('sortBy',    sortBy)

  if (direction) params.set('direction', direction)
  params.set('range', `${start},${end}`)

  const endpoint = segment === 'items' 
    ? 'api/products' 
    : 'api/product-categories'

  // 3️⃣ fetch the table rows
  const rowsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`)
  const rowsJson = await rowsRes.json()
  const tableData = rowsJson.data.data || []
  const totalCount = rowsJson.data.count

  console.log(tableData)

  // 4️⃣ render the client UI, passing all of it down
  return (
    <ClientMenuInner
      segment={segment}
      search={search}
      branchOptions={branchOptions}
      categoryOptions={categoryOptions}
      filters={{ branch, category }}
      sortConfig={ sortBy ? { key: sortBy, direction } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  )
}
