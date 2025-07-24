import ClientOrderInner from "../../components/pages/orders/clientOrderInner";

export const dynamic = 'force-dynamic'

export default async function Orders({ searchParams }) {
  const {
    segment   = 'all',
    search    = '',
    branch    = '',
    channel   = '',
    dateRange = '',
    price     = '',
    page      = '0',
  } = await searchParams;

  const pageIdx = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientOrderInner
      segment={segment}
      search={search}
      filters={{ branch, channel, dateRange }}
      sortConfig={price ? { key: 'price', direction: price } : null}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}
