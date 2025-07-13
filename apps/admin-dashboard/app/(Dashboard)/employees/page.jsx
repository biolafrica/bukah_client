// app/employees/page.jsx (Server Component)

import ClientEmployeeInner from "../../components/pages/employee/clientEmployeeInner"


export const dynamic = 'force-dynamic'

export default async function EmployeesPage({ searchParams }) {
  const {
    segment     = 'employees',  // 'employees' or 'permissions'
    searchTerm  = '',
    branch      = '',           // branchId
    isActive    = '',           // 'true' or 'false'
    role        = '',
    name        = '',           // sort by name: 'ascending'|'descending'
    page        = '0',
  } = await searchParams

  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  // Fetch branch options
  const branchesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`
  )
  const branchesJson = await branchesRes.json()
  const branches = branchesJson.data.data; 
  const branchOptions = branches.map(b => ({
    value: b.id,
    label: b.name,
  }))

  // Build params if segment is employees
  let tableData = []
  let totalCount = 0

  if (segment === 'employees') {
    const params = new URLSearchParams()
    if (searchTerm) params.set('searchTerm', searchTerm)
    if (branch)     params.set('branch',     branch)
    if (isActive)   params.set('isActive',   isActive)
    if (role)       params.set('role',       role)
    if (name)       params.set('name',       name)
    params.set('range', `${start},${end}`)

    const usersRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?${params}`
    )
    const usersJson   = await usersRes.json()
    const wrapper     = usersJson.data
    tableData    = wrapper.data
    totalCount   = wrapper.count
  }

  return (
    <ClientEmployeeInner
      segment={segment}
      searchTerm={searchTerm}
      branchOptions={branchOptions}
      filters={{ branch, isActive, role }}
      sortConfig={ name ? { key: 'name', direction: name } : null }
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  )
}
