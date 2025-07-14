"use client"
import HeadingIntro from "../headingIntro";
import * as outline    from '@heroicons/react/24/outline'
import { order } from "../../../data/order";
import MetricsContainer from "../metricsCont";
import SegmentedToolbars from "../segment";
import EmptyState from "../../common/emptyState";
import DataTable from "../dataTable";
import { useSearchParams, useRouter } from "next/navigation";


export default function ClientOrderInner({
  segment,
  search,
  branchOptions,
  dateRange,
  filters,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
}){

  const router = useRouter()
  const params = useSearchParams()
  const [drStart, drEnd] = (dateRange || '').split(',')

  let config = [
    { key:'branch',   label:'Branch',   type:'select', options: branchOptions },

    { key:'channel', label:'channel', type:'select', options: order.channelOption },

    {
      key:   'dateRange',
      label: 'Date Created',
      type:  'date-range',
      value: { from: drStart, to: drEnd },
    },

  ]

  // helper to update URL without full reload
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k,v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  const isQuerying = [
    'segment', 'search', 'dateRange', 'branch', 'channel',
  ].some((k) => {
    const val = params.get(k)
    return val != null && val !== ''
  })


  return(
    <div className="p-5 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Orders" 
        moduleIntro="View and monitors all orders across channels" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={true}
        onButtonClick={()=>console.log("export")}
      />

      <MetricsContainer
        metrics={order.metrics}
      />

      <SegmentedToolbars
        segments={order.segment}
        defaultActive={segment}

        onSegmentChange={(key) => updateParams({ segment: key })}

        onSearch={q => updateParams({ search: q })}

        filterProps={
          {
            filters,
            config,
            onChange: (k, v) => updateParams({ [k]: v }),
            onApply:  () => {}, 
            onClear:  () => updateParams({ branch: '', channel: '', dateRange:''}),
            title:    'Filter Orders'
          }
        }

        sortProps={{
          options: order.sortOptions,
          sortConfig,
          onSort: key => {
            const dir = sortConfig?.key===key && sortConfig.direction ==='ascending'
              ? 'descending'
              : 'ascending'
            updateParams({ price: dir})
          },
          onClear: () => updateParams({price: null}),
          label: 'Sort',
        }}
      />

      {tableData.length === 0 && 
        <EmptyState
          icon={outline.InboxIcon}
          title={isQuerying ? 'No results found' : 'No order yet'}
          description={isQuerying ? 'Try clearing your filters or search terms.' : "No order placed yet."}
        />
      }

      {tableData.length !== 0 && 
        <DataTable
          columns={order.columns} 
          data={tableData}
          onEdit={()=>console.log("delete")}
          onDelete={()=>console.log("delete")}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={(newPage) => updateParams({ page: newPage })} 
        />
      }

    </div>
  )
}