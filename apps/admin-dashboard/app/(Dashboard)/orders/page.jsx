"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNaira, formatNumber } from "../../utils/format";
import DataTable from "../../components/pages/dataTable";

export default function Orders(){
  const handleOrderExport=()=>{}
  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

  const columns = [
    { key: 'orderID', header: 'Order ID', minWidth: '150px' },
    { key: 'items', header: 'Items', minWidth: '300px' },
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
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
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
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "cancelled"
    },
    {
      id: 2,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "inprogress"
    },
    {
      id: 3,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "received"
    },
    {
      id: 4,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "completed"
    },

  ]

  return (
    <div className="order-container p-5 pt-30 lg:pl-75">

       {/* Module Intro component */}
      <HeadingIntro 
        module="Items" 
        moduleIntro="View and monitors all orders across channels" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={true}
        onButtonClick={handleOrderExport}
      />

      {/* Transaction Metrics components */}
      <MetricsContainer
        metrics={[
          { label: 'Total Orders', value: formatNumber(2500), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
          { label: 'Completed', value: formatNumber(2400), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
          { label: 'In Progress', value: formatNumber(90), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
          { label: 'Cancelled', value: formatNumber(19), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
        ]}
      />


      {/* Segmented Buttons and filter Component */}
      <SegmentedToolbar
        segments={[
          { key: 'all', label: 'All' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' },
        ]}
        defaultActive="all"
        onSegmentChange={(key) => console.log('Segment:', key)}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search order Id'
      />

      {/* Table Component */}
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>

    </div>
  )
}