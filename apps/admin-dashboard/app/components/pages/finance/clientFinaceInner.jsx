"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro     from '../../common/headingIntro'
import MetricsContainer from '../../common/metricsCont'
import DataTable        from '../../common/dataTable'
import EmptyState       from '../../common/emptyState'
import * as outline     from '@heroicons/react/24/outline'
import { formatNaira }  from '../../../utils/format'
import SegmentedToolbars from '../../common/segment'

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
  metrics,
}) {
  const router = useRouter()
  const params = useSearchParams()

  // Split date range
  const [drStart, drEnd] = (dateRange || '').split(',')

  // Filter configuration
  const filterConfig = [
    {
      key:   'dateRange',
      label: 'Date Created',
      type:  'date-range',
      value: { from: drStart, to: drEnd },
    },
    {
      key:    'branch',
      label:  'Branch',
      type:   'select',
      options: branchOptions,
    },
    {
      key:    'method',
      label:  'Method',
      type:   'select',
      options: [
        { value: 'cash',     label: 'Cash'     },
        { value: 'transfer', label: 'Transfer' },
        { value: 'card',     label: 'Card'     },
      ],
    },
  ]

  // Sort options
  const sortOptions = [
    { key: 'totalAmount', label: 'Total Amount' },
  ]

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

      <MetricsContainer metrics={metrics} />

      <SegmentedToolbars
        segments={[
          { key: 'all',        label: 'All'       },
          { key: 'successful', label: 'Successful' },
          { key: 'pending',    label: 'Pending'    },
          { key: 'refund',     label: 'Refund'     },
        ]}
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
          options: sortOptions,
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
          columns={[
            { key: 'reference_id', header: 'Reference ID', minWidth: '150px' },
            { key: 'order.order_code', header: 'Order ID', minWidth: '150px', render: row => row.order?.order_code ?? '-' },
            { key: 'payment_method', header: 'Payment Method', minWidth: '150px' },
            { key: 'branch', header: 'Branch', minWidth: '150px', render: row => row.branch?.name ?? '-' },
            { key: 'total_amount', header: 'Amount', minWidth: '150px', render: row => formatNaira(row.total_amount) },
            { key: 'created_at', header: 'Date and Time', minWidth: '150px', render: row => new Date(row.created_at).toLocaleString('en-GB') },
            {
              key: 'transaction_type',
              header: 'Status',
              minWidth: '100px',
              render: row => {
                const colors = {
                  successful: 'bg-green-100 text-green-800',
                  pending:    'bg-yellow-100 text-yellow-800',
                  refund:     'bg-blue-100 text-blue-800',
                }
                const cls = colors[row.transaction_type] || 'bg-gray-100 text-gray-800'
                return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{row.transaction_type}</span>
              }
            },
          ]}
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