"use client"

import { format } from "date-fns"
import Link from "next/link"
import { useDashboard } from "../../../hooks/useDashboards"

import DataTable from "../../common/dataTable"
import ListingCard from "../../common/listCard"
import MetricsContainer from "../../common/metricsCont"
import Carousel from "../../uiComponents/carousel"
import LoadingSpinner from "../../common/loadingSpinner"

import { formatNaira} from "../../../utils/format"


export default function ClientHomeInner(){
  const {metrics, range, setRange, items, users, products, loading, error} = useDashboard();

  if (loading) return <LoadingSpinner/>
  if (error)   return <p>Error: {error.message}</p>
 
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

  return(
    <div className="flex gap-5">
     
      <div className="w-full xl:w-5/8">

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
            onEdit={()=>console.log("edit")} 
            onDelete={()=>console.log("delete")}
            loading = {loading}
          />
        </div>
        
      </div>

      <div className=" hidden lg:block xl:w-3/8 pt-5 pr-3 ">
        <Carousel items={suggestions} interval={7000}/>
        <ListingCard title="Best Selling Food" items={products}/>
        <ListingCard title="Sales By Staff" items={users}/>
      </div>

    </div>
  )
}