import ClientBranchesInner from "../../components/pages/branches/clientBranchesInner"

export const dynamic = 'force-dynamic'

export default async function BranchesPage({ searchParams }) {
  const { page = '0' } = await searchParams;
  const pageIdx = parseInt(page, 10) || 0;
  const pageSize = 10;

  return (
    <ClientBranchesInner
      currentPage={pageIdx}
      pageSize={pageSize}
    />
  );
}
