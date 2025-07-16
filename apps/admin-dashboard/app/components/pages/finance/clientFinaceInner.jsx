"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro     from '../../common/headingIntro'
import MetricsContainer from '../../common/metricsCont'
import DataTable        from '../../common/dataTable'
import EmptyState       from '../../common/emptyState'
import * as outline     from '@heroicons/react/24/outline'
import SegmentedToolbars from '../../common/segment'
import { transaction } from '../../../data/transaction'

export default function ClientFinanceInner({
  segment,
  searchId,
  dateRange,
  filters,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
  branchOptions,
  metricData,
}) {
  const router = useRouter()
  const params = useSearchParams()

  const filterConfig = transaction.filterConfig(dateRange, branchOptions);

  const { metrics, range, setRange} = transaction.useFinanceMetrics(metricData)

  // Helper to update URL params
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  const isQuerying = [
    'segment', 'searchId', 'dateRange', 'branch', 'method', 'totalAmount'
  ].some((k) => {
    const val = params.get(k)
    return val != null && val !== ''
  })

  return (
    <div className="p-5 pt-30 lg:pl-75">
      
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
        ranges={['today','last7','last30']}
      />

      <SegmentedToolbars
        segments={transaction.segments}
        defaultActive={segment}
        onSegmentChange={(key) => updateParams({ segment: key })}
        onSearch={(q) => updateParams({ searchId: q })}

        filterProps={{
          filters,
          config:   filterConfig,
          onChange: (k, v) => updateParams({ [k]: v }),
          onApply:  () => {},
          onClear:  () => updateParams({ dateRange:'', branch:'', method:'' }),
          title:    'Filter Transactions'
        }}

        sortProps={{
          options: transaction.sortOptions,
          sortConfig,
          onSort:     (key) => {
            const dir = sortConfig?.key === key && sortConfig.direction === 'ascending'
              ? 'descending'
              : 'ascending'
            updateParams({ totalAmount: dir})
          },
          onClear: () => updateParams({ totalAmount: null}),
          label:      'Sort'
        }}

        searchPlaceholder="Search Reference ID"
      />

      {tableData.length === 0 ? (
        <EmptyState
          icon={outline.InboxIcon}
          title={isQuerying ? 'No results found' : 'No transactions'}
          description={
            isQuerying
              ? 'Try clearing your filters or search.'
              : 'No transactions to show.'
          }
        />
      ) : (
        <DataTable
          columns={transaction.colums}
          data={tableData}
          onEdit={() => {} }
          onDelete={() => {} }
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={(p) => updateParams({ page: p })}
        />
      )}
    </div>
  )
}