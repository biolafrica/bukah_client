import ClientFinanceInner from "../../components/pages/finance/clientFinaceInner";
export const dynamic = 'force-dynamic';

export default async function FinancePage({ searchParams }) {
  const {
    segment     = 'all',
    searchId    = '',
    dateRange   = '',
    branch      = '',
    method      = '',
    totalAmount = '',
    page        = '0',
  } = await searchParams;

  const pageIdx  = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientFinanceInner
      segment={segment}
      searchId={searchId}
      filters={{ branch, method, dateRange }}
      sortConfig={totalAmount ? { key: 'totalAmount', direction: totalAmount } : null}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}

