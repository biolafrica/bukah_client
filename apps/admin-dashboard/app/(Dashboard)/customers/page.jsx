import ClientCustomerInner from "../../components/pages/customers/clientCustomer"

export const dynamic = 'force-dynamic'

export default async function CustomersPage({ searchParams }) {
  const {
    segment     = 'all',
    search      = '',
    dateRange   = '',
    totalSpent  = '',
    page        = '0',
  } = await searchParams;

  const pageIdx = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientCustomerInner
      segment={segment}
      search={search}
      filters={{ dateRange }}
      sortConfig={totalSpent ? { key: 'totalSpent', direction: totalSpent } : null}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}