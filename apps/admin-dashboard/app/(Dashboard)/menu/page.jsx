import ClientMenuInner from "../../components/pages/menu/clientMenuInner"

export const dynamic = 'force-dynamic'

export default async function MenuPage({ searchParams }) {
  const {
    segment  = 'items',
    search   = '',
    branch   = '',
    category = '',
    name     = '',
    page     = '0',
  } = await searchParams;

  const pageIdx = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientMenuInner
      segment={segment}
      search={search}
      filters={{ branchId: branch, categoryId: category }}
      sortConfig={name ? { key: 'name', direction: name } : null}
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}
