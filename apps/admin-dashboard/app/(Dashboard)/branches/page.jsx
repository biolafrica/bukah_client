import ClientBranchesInner from "../../components/pages/branches/clientBranchesInner"


export const dynamic = 'force-dynamic'

export default async function BranchesPage({ searchParams }) {
  const { page = '0' } = await searchParams
  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  // Fetch paginated branches
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/branches?range=${start},${end}`
  )
  const json       = await res.json()
  const tableData  = json.data.data
  const totalCount = json.data.count

  return (
    <ClientBranchesInner
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  )
}