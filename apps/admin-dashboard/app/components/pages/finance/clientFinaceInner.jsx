"use client"
import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';

import HeadingIntro     from '../../common/headingIntro'
import MetricsContainer from '../../common/metricsCont'
import DataTable        from '../../common/dataTable'
import EmptyState       from '../../common/emptyState'
import SegmentedToolbars from '../../common/segment'
import MoreTransaction from './moreTransaction'
import LoadingSpinner from '../../common/loadingSpinner';

import { usePaginatedTable } from '../../../hooks/usePaginatedTable'
import { useBranchOptions } from '../../../hooks/useBranchOptions'

import * as outline     from '@heroicons/react/24/outline'
import { transaction } from '../../../data/transaction'



export default function ClientFinanceInner({
  segment,
  searchId,
  filters,
  sortConfig,
  currentPage,
  pageSize,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sideScreenOpen, setSideScreenOpen] = useState(false);
  const [items, setItems] = useState(null);

  const { data: branchOptions, isLoading, isError, error } = useBranchOptions();


  const queryFilters = useMemo(() => ({
    ...(segment !== 'all' && { type: segment }),
    ...(searchId && { searchId }),
    ...filters,
    ...(sortConfig?.key && { [sortConfig.key]: sortConfig.direction }),
  }), [segment, searchId, filters, sortConfig]);


  const { data, isLoading: tableLoading } = usePaginatedTable({
    key: 'transactions',
    endpoint: '/api/transactions',
    page: currentPage,
    pageSize,
    filters: queryFilters,
  });


  const { data: metricData } = useQuery({
    queryKey: ['transactions-metrics'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/metrics`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const json = await res.json();
      return json.data;
    }
  });


  const filterConfig = transaction.filterConfig(branchOptions || []);
  const { metrics, range, setRange } = transaction.useFinanceMetrics(metricData);

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    router.replace(`?${next.toString()}`);
  };

  const isQuerying = ['segment', 'searchId', 'dateRange', 'branch', 'method', 'totalAmount'].some(
    (k) => params.get(k)
  );

  const handleMoreScreen = (row) => {
    setItems(row);
    setSideScreenOpen(true);
  };

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5 pt-30 lg:pl-75">

      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSideScreenOpen(false)} />
          <div className="relative z-65">
            <MoreTransaction onClose={() => setSideScreenOpen(false)} data={items} />
          </div>
        </div>
      )}

      <HeadingIntro
        module="Finances"
        moduleIntro="View and manage all your money in one place"
        Icon={outline.ArrowUpOnSquareIcon}
        buttonText="Export"
        branches={false}
        onButtonClick={() => console.log('Export CSV')}
      />

      <MetricsContainer
        metrics={metrics}
        range={range}
        onRangeChange={setRange}
        ranges={['today', 'last7', 'last30']}
      />

      <SegmentedToolbars
        segments={transaction.segments}
        defaultActive={segment}
        onSegmentChange={(key) => updateParams({ segment: key })}
        onSearch={(q) => updateParams({ searchId: q })}
        filterProps={{
          filters,
          config: filterConfig,
          onChange: (k, v) => updateParams({ [k]: v }),
          onApply: () => {},
          onClear: () => updateParams({ dateRange: '', branch: '', method: '' }),
          title: 'Filter Transactions',
        }}
        sortProps={{
          options: transaction.sortOptions,
          sortConfig,
          onSort: (key) => {
            const dir = sortConfig?.key === key && sortConfig.direction === 'ascending'
              ? 'descending'
              : 'ascending';
            updateParams({ totalAmount: dir });
          },
          onClear: () => updateParams({ totalAmount: null }),
          label: 'Sort',
        }}
        searchPlaceholder="Search Reference ID"
      />

      {!data?.data?.length ? (
        <EmptyState
          icon={outline.WalletIcon}
          title={isQuerying ? 'No results found' : 'No transactions'}
          description={
            isQuerying ? 'Try clearing your filters or search.' : 'No transactions to show.'
          }
        />
      ) : (
        <DataTable
          columns={transaction.colums}
          data={data.data}
          deleteIcon={false}
          edit={false}
          exportIcon
          onExport={() => console.log('export')}
          onMore={handleMoreScreen}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={data.count}
          onPageChange={(p) => updateParams({ page: p })}
        />
      )}
    </div>
  );
}