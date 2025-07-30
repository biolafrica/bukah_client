"use client"

import { useState,useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';

import HeadingIntro     from '../../common/headingIntro'
import MetricsContainer from '../../common/metricsCont'
import SegmentedToolbar from '../../common/segment'
import EmptyState       from '../../common/emptyState'
import DataTable        from '../../common/dataTable'
import ListingCard      from '../../common/listCard'
import CustomerDetails from './customerDetails'

import { usePaginatedTable } from '../../../hooks/usePaginatedTable'
import { customer } from '../../../data/customer'
import * as outline     from '@heroicons/react/24/outline'
import { formatNaira }  from '../../../utils/format'
import LoadingSpinner from '../../common/loadingSpinner';
import { useMetricTransformer } from '../../../hooks/useMetricsTransformer';
import { useMetricResource } from '../../../hooks/useMetricResources';


export default function ClientCustomerInner({
  segment,
  search,
  sortConfig,
  filters,
  currentPage,
  pageSize,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sideScreenOpen, setSideScreenOpen] = useState(false);
  const [moreArray, setMoreArray] = useState(null);

  const queryFilters = useMemo(() => ({
    ...(segment !== 'all' && { type: segment }),
    ...(search && { searchTerm: search }),
    ...filters,
    ...(sortConfig?.key && { [sortConfig.key]: sortConfig.direction }),
  }), [segment, search, filters, sortConfig]);

  const { data, isLoading } = usePaginatedTable({
    key: 'customers',
    endpoint: '/api/customers',
    page: currentPage,
    pageSize,
    filters: queryFilters,
  });

  const { data: topData } = useQuery({
    queryKey: ['customers-tops'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/tops`);
      if (!res.ok) throw new Error('Failed to fetch top customers');
      return (await res.json()).data;
    }
  });


  const { data: customerMetrics, isLoading:metricLoading } = useMetricResource({
    resourceKey: 'customers-metrics',
    endpoint: '/api/customers/metrics',
  })


  const filterConfig = customer.filterConfig();
  const { metrics, range, setRange } = useMetricTransformer(customerMetrics, { formatStrategy: "number" });

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    router.replace(`?${next.toString()}`);
  };

  const hasQuery = ['segment', 'searchTerm', 'dateRange', 'totalSpent'].some((k) => {
    const val = params.get(k);
    return val && val !== '' && val !== 'all';
  });

  const close = () => setSideScreenOpen(false);
  const handleMore = (row) => {
    setMoreArray(row);
    setSideScreenOpen(true);
  };

  return (
    <div className="p-5 pt-30 lg:pl-75">
      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div className="absolute inset-0 bg-black opacity-50" onClick={close} />
          <div className="relative z-65">
            <CustomerDetails onClose={close} data={moreArray} />
          </div>
        </div>
      )}

      <HeadingIntro
        module="Customers"
        moduleIntro="Understand your customers to improve service"
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

      <div className="flex gap-5">
        {/* Left: Table */}
        <div className="flex-1 lg:w-4/7">
          <SegmentedToolbar
            segments={customer.segments}
            defaultActive={segment}
            onSegmentChange={(key) => updateParams({ segment: key })}
            onSearch={(q) => updateParams({ search: q })}
            filterProps={{
              filters,
              config: filterConfig,
              onChange: (k, v) => updateParams({ [k]: v }),
              onApply: () => {},
              onClear: () => updateParams({ dateRange: '' }),
              title: 'Filter by Registration Date',
            }}
            sortProps={{
              options: customer.sortOptions,
              sortConfig,
              onSort: (key) => {
                const dir =
                  sortConfig?.key === key && sortConfig.direction === 'ascending'
                    ? 'descending'
                    : 'ascending';
                updateParams({ totalSpent: dir });
              },
              onClear: () => updateParams({ totalSpent: null }),
              label: 'Sort',
            }}
            searchPlaceholder="Search customers"
          />

          {isLoading ? (
            <LoadingSpinner/>
          ) : !data?.data?.length ? (
            <EmptyState
              icon={outline.UserGroupIcon}
              title={hasQuery ? 'No results found' : 'No customers yet'}
              description={
                hasQuery
                  ? 'Try clearing your filters or search.'
                  : 'Attract new customers to get started.'
              }
            />
          ) : (
            <DataTable
              columns={customer.columns}
              data={data.data}
              edit={false}
              onDelete={() => console.log('delete')}
              onMore={handleMore}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={data.count}
              onPageChange={(p) => updateParams({ page: p })}
            />
          )}
        </div>

        {/* Right: Top Customers */}
        <div className="hidden lg:block lg:w-2/7 pt-5">
          {topData && (
            <>
              <ListingCard
                title="Top Customers - Most Orders"
                items={topData.most_orders.data.map((c) => ({
                  id: c.id,
                  name: c.name,
                  role: c.is_registered ? 'Registered' : 'Guest',
                  countText: `${c.total_orders} orders`,
                }))}
              />
              <ListingCard
                title="Top Customers - Highest Spenders"
                items={topData.top_spenders.data.map((c) => ({
                  id: c.id,
                  name: c.name,
                  role: c.is_registered ? 'Registered' : 'Guest',
                  countText: formatNaira(c.total_spent),
                }))}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
