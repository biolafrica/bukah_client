"use client"

import HeadingIntro from "../components/common/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import { formatNaira, formatNumber } from "../utils/format";
import MetricsContainer from "../components/common/metricsCont";
import DataTable from "../components/common/dataTable";
import ListingCard from "../components/common/listCard";
import Carousel from "../components/uiComponents/carousel";

export default function Home() {
  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

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
  ]

  const columns = [
    { key: 'orderID', header: 'Order ID', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px' },
    { key: 'staff', header: 'Staff', minWidth: '150px' },
    { key: 'amount', header: 'Amount', minWidth: '150px' },
    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px' },
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

  const data =[
    {
      id: 1,
      orderID: '#001',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "cancelled"
    },
    {
      id: 2,
      orderID: '#001',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "inprogress"
    },
    {
      id: 3,
      orderID: '#001',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "received"
    },
    {
      id: 4,
      orderID: '#001',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "completed"
    },

  ];

  const topSelling = [
    { id: 1, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 2, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 3, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 4, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
    { id: 5, name: 'Jollof Rice', role: 'Main', countText: '100 orders', avatarUrl: '/images/food.png'},
  ]

  const topStaff = [
    { id: 1, name: 'Chinedu Daniel', role: 'Waiter', countText: formatNaira(120000) },
    { id: 2, name: 'Ada Lovelace', role: 'Waiter', countText: formatNaira(100000) },
    { id: 3, name: 'Ada Lovelace', role: 'Bartender', countText: formatNaira(80000) },
    { id: 4, name: 'Ada Lovelace', role: 'Waiter', countText: formatNaira(70000) },
    { id: 5, name: 'Ada Lovelace', role: 'Bartender', countText: formatNaira(20000) },
  ]

  return (
    <div className="home-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Overview" 
        moduleIntro="View performance metrics and key insight at a glance" 
        Icon={outline.ChevronDownIcon} 
        buttonText="This month" 
        branches={true}
      />

      <div className="flex gap-5">

        <div className="flex-1 lg:w-4/7">

          {/* Transaction Metrics components */}
          <MetricsContainer
            metrics={[
              { label: 'Total Sales', value: formatNaira(125500000), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
              { label: 'Total Orders', value: formatNumber(2500), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
              { label: 'Total Customers', value: formatNumber(312), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
              { label: 'Customer Satisfaction', value: "89%", percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
            ]}
          />

          {/* Sales Graph components */}
          <div className="h-[419px] border border-border-text rounded-md mb-5 bg-white">

          </div>

          {/* Table Component */}
          <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>
          
        </div>

        <div className=" hidden lg:block lg:w-2/7 pt-5 ">

          <Carousel items={suggestions} interval={7000}/>
          <ListingCard title="Best Selling Food" items={topSelling}/>
          <ListingCard title="Sales By Staff" items={topStaff}/>
        </div>

      </div>

    

    </div>
   
  )
}
