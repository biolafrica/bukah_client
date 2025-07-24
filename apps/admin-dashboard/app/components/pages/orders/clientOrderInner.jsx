"use client"

import HeadingIntro from "../../common/headingIntro";
import * as outline    from '@heroicons/react/24/outline'
import { order } from "../../../data/order";
import MetricsContainer from "../../common/metricsCont";
import SegmentedToolbars from "../../common/segment";
import EmptyState from "../../common/emptyState";
import DataTable from "../../common/dataTable";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { OrderDetails } from "./orderDetails";
import Alert from "../../common/alert";


export default function ClientOrderInner({
  segment,
  search,
  filters,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
  metricData
}){

  const router = useRouter()
  const params = useSearchParams()

  const [sideScreenOpen, setSideScreenOpen] = useState(false)
  const [moreArray, setMoreArray] = useState(null)

  const[show , setShow] = useState(false)

  const close = () => {setSideScreenOpen(false)}

  const handleMore = (row)=>{
    setMoreArray(row)
    setSideScreenOpen(true)
  }

  const filterConfig = order.filterConfig()

  const { metrics, range, setRange} = order.useOrderMetrics(metricData)

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

      {sideScreenOpen && (
        <div className='fixed inset-0 z-60 flex'>
          <div 
            className='absolute inset-0 bg-black opacity-50'
            onClick={close}
          />

          <div className='relative z-65'>
            <OrderDetails onClose= {close} data={moreArray}/>
          </div>

        </div>
      )}

     { show && <Alert
        type="error"
        heading="Payment Failed"
        subheading="Please try again or contact support."
        duration={8000}
        onClose={() => setShow(false)}
      />}

      <HeadingIntro 
        module="Orders" 
        moduleIntro="View and monitors all orders across channels" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={true}
        onButtonClick={()=>console.log("export")}
      />

      <MetricsContainer
        metrics={metrics} 
        range={range}
        onRangeChange={setRange}
        ranges={['today','last7','last30']}
      />

      <SegmentedToolbars
        segments={order.segment}
        defaultActive={segment}

        onSegmentChange={(key) => updateParams({ segment: key })}

        onSearch={q => updateParams({ search: q })}

        filterProps={
          {
            filters,
            config :filterConfig,
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
          edit={false}
          onDelete={()=>console.log("delete")}
          onMore={handleMore}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={(newPage) => updateParams({ page: newPage })} 
        />
      }

    </div>
  )
}