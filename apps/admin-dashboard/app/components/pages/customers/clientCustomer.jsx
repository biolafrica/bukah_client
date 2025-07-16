"use client"

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro     from '../../common/headingIntro'
import MetricsContainer from '../../common/metricsCont'
import SegmentedToolbar from '../../common/segment'
import EmptyState       from '../../common/emptyState'
import DataTable        from '../../common/dataTable'
import ListingCard      from '../../common/listCard'
import * as outline     from '@heroicons/react/24/outline'
import { formatNaira }  from '../../../utils/format'
import CustomerDetails from './customerDetails'

export default function ClientCustomerInner({
  segment,
  search,
  dateRange,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
  topOrders,
  topSpenders,
  metrics,
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [drStart, drEnd] = (dateRange || '').split(',')

  const [sideScreenOpen, setSideScreenOpen] = useState(false)
  const [moreArray, setMoreArray] = useState(null)

  const close = () => {setSideScreenOpen(false)}

  const handleMore = (row)=>{
    setMoreArray(row)
    setSideScreenOpen(true)
  }

  // Filter config: only date-range for customers
  const filterConfig = [
    {
      key:   'dateRange',
      label: 'Date Registered',
      type:  'date-range',
      value: { from: drStart, to: drEnd },
    },
  ]

  // Sort options: totalOrders or totalSpent
  const sortOptions = [
    { key: 'totalSpent', label: 'Total Spent'  }
  ]

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  const hasQuery = [
    'segment', 'searchTerm', 'dateRange', 'totalOrders', 'totalSpent',
  ].some((k) => {
    const val = params.get(k) || params.get('segment')
    return val != null && val !== '' && val !== 'all'
  })

  return (
    <div className="p-5 pt-30 lg:pl-75">

      {sideScreenOpen && (
        <div className='fixed inset-0 z-60 flex'>
          <div 
            className='absolute inset-0 bg-black opacity-50'
            onClick={close}
          />

          <div className='relative z-65'>
            <CustomerDetails onClose= {close} data={moreArray}/>
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

      <MetricsContainer metrics={metrics} />

      <div className="flex gap-5">

        {/* Left Column: Table and Controls */}
        <div className="flex-1 lg:w-4/7">
          
          <SegmentedToolbar
            segments={[
              { key: 'all',        label: 'All' },
              { key: 'registered', label: 'Registered' },
              { key: 'guest',      label: 'Guest' },
            ]}
            defaultActive={segment}
            onSegmentChange={(key) => updateParams({ segment: key })}
            onSearch={(q) => updateParams({ searchTerm: q })}
            filterProps={{
              filters:    { dateRange },
              config:     filterConfig,
              onChange:   (k, v) => updateParams({ [k]: v }),
              onApply:    () => {},
              onClear:    () => updateParams({ dateRange: '' }),
              title:      'Filter by Registration Date',
            }}
            sortProps={{
              options:    sortOptions,
              sortConfig,
              onSort:     (key) => {
                const dir = sortConfig?.key === key && sortConfig.direction === 'ascending'
              ? 'descending'
              : 'ascending'
                updateParams({ totalSpent: dir })
              },
              onClear:    () => updateParams({totalSpent: null }),
              label:      'Sort',
            }}
            searchPlaceholder="Search customers"
          />

          {tableData.length === 0 ? (
            <EmptyState
              icon={outline.InboxIcon}
              title={hasQuery ? 'No results found' : 'No customers yet'}
              description={
                hasQuery
                  ? 'Try clearing your filters or search.'
                  : 'Attract new customers to get started.'
              }
            />
          ) : (
            <DataTable
              columns={[
                { key: 'name',header: 'Name',minWidth: '200px' },
                { key: 'total_orders',header: 'Total Orders',    minWidth: '150px' },
                {key: 'total_spent',header: 'Total Spent',    minWidth: '150px',
                  render: (row) => formatNaira(row.total_spent)
                },
                {key: 'created_at', header: 'Date Registered', minWidth: '150px',
                  render: (row) => new Date(row.created_at).toLocaleDateString('en-GB')
                },
              ]}
              data={tableData}
              edit={false}
              onDelete={() => console.log("delete") }
              onMore={handleMore}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={(p) => updateParams({ page: p })}
            />
          )}
        </div>

        {/* Right Column: Top Customers */}
        <div className="hidden lg:block lg:w-2/7 pt-5">
          <ListingCard
            title="Top Customers - Most Orders"
            items={topOrders.map((c) => ({
              id:        c.id,
              name:      c.name,
              role:      c.is_registered ? 'Registered' : 'Guest',
              countText: `${c.total_orders} orders`, 
            }))}
          />

          <ListingCard
            title="Top Customers - Highest Spenders"
            items={topSpenders.map((c) => ({
              id:        c.id,
              name:      c.name,
              role:      c.is_registered ? 'Registered' : 'Guest',
              countText: formatNaira(c.total_spent),
            }))}
          />
        </div>
      </div>

    </div>
  )
}
