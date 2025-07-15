import ClientMenuInner from "../../components/pages/menu/clientMenuInner"
import { OptionProvider } from "../../components/context/optionsContext"

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


  //fetch options for filter
  const [branchesRes, catsRes, menuRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/common/product-categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/common/products`),
  ])

  const [branchesJson, catsJson, menuJson] = await Promise.all([
    branchesRes.json(),
    catsRes.json(),
    menuRes.json(),
  ])

  const [branches, categories, menus] = [branchesJson.data.data, catsJson.data.data, menuJson.data.data]

  const branchOptions = branches.map(b => ({ value: b.id, label: b.name }))
  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }))
  const singleItemOptions = menus.map(i => ({ value: i.id, label: i.name }))


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
    ? 'api/products' 
    : 'api/product-categories'

  // 3️⃣ fetch the table rows
  const rowsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`)
  const rowsJson = await rowsRes.json()
  const tableData = rowsJson.data.data || []
  const totalCount = rowsJson.data.count

  // 4️⃣ render the client UI, passing all of it down
  return (
    <OptionProvider 
      branchOptions={branchOptions} 
      categoryOptions={categoryOptions} 
      singleItemOptions={singleItemOptions}
    >

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

    </OptionProvider>
  )
}
