import ClientEmployeeInner from "../../components/pages/employee/clientEmployeeInner"

export const dynamic = 'force-dynamic'

export default async function EmployeesPage({ searchParams }) {
  const {
    segment     = 'employees',
    searchTerm  = '',
    branch      = '',
    isActive    = '',
    role        = '',
    name        = '',
    page        = '0',
  } = await searchParams;

  const pageIdx = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientEmployeeInner
      segment={segment}
      searchTerm={searchTerm}
      filters={{ branch, isActive, role }}
      sortConfig={name ? { key: 'name', direction: name } : null}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}

