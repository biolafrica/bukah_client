import ClientMenuInner from "../../context/menu/innerConsumer"

export const dynamic = 'force-dynamic'

export default async function MenuPage({ searchParams }) {

  const {
    segment  = 'items',
    search   = '',
    branch   = '',
    category = '',
    sortBy   = '',
    direction= '',
  } = await searchParams


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

  const endpoint = segment === 'items' 
    ? 'api/products' 
    : 'api/product-categories'

  // 3️⃣ fetch the table rows
  const rowsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`)
  const rowsJson = await rowsRes.json()
  const tableData = rowsJson.data.data || []
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
    />
  )
}
