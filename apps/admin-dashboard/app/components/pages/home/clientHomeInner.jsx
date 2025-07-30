"use client"

import { format } from "date-fns"
import { useMetricResource } from "../../../hooks/useMetricResources"
import { useMetricTransformer } from "../../../hooks/useMetricsTransformer"

import { formatNaira, formatNumber } from "../../../utils/format"
import DataTable from "../../common/dataTable"
import ListingCard from "../../common/listCard"
import MetricsContainer from "../../common/metricsCont"
import Carousel from "../../uiComponents/carousel"
import Link from "next/link"
import { useOrders } from "../../../hooks/useOrder"

export default function ClientHomeInner(){

  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

  const { data: generalMetrics, isLoading:metricLoading } = useMetricResource({
    resourceKey: 'general-metrics',
    endpoint: '/api/common/metrics',
  })

  const { metrics, range, setRange } = useMetricTransformer(generalMetrics, { formatStrategy: "suto" });

  const { items, isLoading, isError, error } = useOrders()
  if (isLoading) return <p>loading....</p>
  if (isError)   return <p>Error: {error.message}</p>

  const suggestions = [
    {
      id: 1,
      title: 'AI Suggestion',
      message: 'Revenue dipped by 12% this week. Do you want a quick breakdown?',
    },
    {
      id: 2,
      title: 'AI Insight',
      message: 'New customer signups are up 8% this month!',
    },
    {
      id: 3,
      title: 'AI Insight',
      message: 'New customer signups are up 8% this month!',
    },
  ];

  const columns = [
    { key: 'order_code', header: 'Order ID', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px',render: row => row.branch?.name ?? '-' },
    { key: 'staff', header: 'Staff', minWidth: '150px',render: row => row.accepted?.first_name ?? '-' },
    { key: 'amount', header: 'Amount', minWidth: '150px',render: (row) => formatNaira(row.total_amount) },
    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px',
      render: row => `${format(new Date(row.placed_at),'dd-MM-yyyy')} | ${format(new Date(row.placed_at),'hh:mm a')}`
    },
    {
      key: 'status',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const colors = {
          completed: 'bg-green-100 text-green-800',
          cancelled: 'bg-red-100 text-red-800',
          inprogress: 'bg-yellow-100 text-yellow-800',
          received: 'bg-blue-100 text-blue-800',
        }
        const cls = colors[row.status] || 'bg-gray-100 text-gray-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {row.status}
          </span>
        )
      }
    },
  ];

  const topSelling = [
    { id: 1, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 2, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 3, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 4, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 5, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
  ];

  const topStaff = [
    { id: 1, name: 'Chinedu Daniel', role: 'Waiter', countText: formatNaira(120000) },
    { id: 2, name: 'Ada Lovelace', role: 'Waiter', countText: formatNaira(100000) },
    { id: 3, name: 'Ada Lovelace', role: 'Bartender', countText: formatNaira(80000) },
    { id: 4, name: 'Ada Lovelace', role: 'Waiter', countText: formatNaira(70000) },
    { id: 5, name: 'Ada Lovelace', role: 'Bartender', countText: formatNaira(20000) },
  ];

  return(
    <div className="flex gap-5">
     
      <div className="w-full xl:w-5/7">

        {/* Transaction Metrics components */}
        <MetricsContainer
          metrics={metrics}
          range={range}
          onRangeChange={setRange}
          ranges={['today', 'last7', 'last30']}
        />

        {/* Sales Graph components */}
        <div className="h-[419px] border border-border-text rounded-md mb-5 bg-white">

        </div>

        {/* Table Component */}
        <div className="p-5 bg-white rouded">

          <div className="flex items-center justify-between font-normal mb-3">
            <h4 className="text-sm">Recent Orders</h4>
            <Link href="/orders" className="text-green-600">See more</Link>
          </div>

          <DataTable 
            columns={columns} 
            data={items} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
          />
        </div>
        
      </div>

      <div className=" hidden lg:block xl:w-2/7 pt-5 pr-3 ">
        <Carousel items={suggestions} interval={7000}/>
        <ListingCard title="Best Selling Food" items={topSelling}/>
        <ListingCard title="Sales By Staff" items={topStaff}/>
      </div>

    </div>
  )
}