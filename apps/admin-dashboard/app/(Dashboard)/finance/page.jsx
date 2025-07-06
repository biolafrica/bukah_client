"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNaira } from "../../utils/format";
import DataTable from "../../components/pages/dataTable";

export default function  Finance() {

  const columns = [
    { key: 'transactionID', header: 'Transaction ID', minWidth: '150px' },
    { key: 'orderID', header: 'Order ID', minWidth: '150px' },
    { key: 'paymentMethod', header: 'Payment Method', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px' },
    { key: 'amount', header: 'Amount', minWidth: '150px' },
    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px' },
    {
      key: 'status',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const colors = {
          successful: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          refunded: 'bg-blue-100 text-blue-800',
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
      transactionID: '1234RT-4567UY-9807',
      branch: 'Branch A',
      paymentMethod: 'Cash',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "refunded"
    },
    {
      id: 2,
      orderID: '#001',
      transactionID: '1234RT-4567UY-9807',
      branch: 'Branch A',
      paymentMethod: 'Transfer',
      amount: formatNaira(90000),
      dateAndTime: '26-06-2025 - 05:00pm',
      status: "pending"
    },
    {
      id: 3,
      orderID: '#001',
      transactionID: '1234RT-4567UY-9807',
      branch: 'Branch A',
      paymentMethod: 'Card',
      amount: formatNaira(20000),
      dateAndTime: '12-05-2025 - 04:00pm',
      status: "successful"
    },

  ]

  const handleFinanceExport=()=>{}
  const handleDelete =(row)=>{}
  const handleEdit =(row)=>{}
  return (
    <div className="finance-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Finances" 
        moduleIntro="View and manage all your money in one place" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export"
        branches={false}
        onButtonClick={handleFinanceExport} 
      />


      {/* Transaction Metrics components */}
      <MetricsContainer
        metrics={[
          { label: 'Total Sales', value: formatNaira(125500000), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
          { label: 'Registered', value: formatNaira(1300000), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
          { label: 'Net Revenue', value: formatNaira(124200000), percentage: '-3.50%', comparison: 'vs last month', trend: 'up' },
        ]}
      />


      {/* Segmented Buttons and filter Component */}
      <SegmentedToolbar
        segments={[
          { key: 'all', label: 'All' },
          { key: 'successful', label: 'Successful' },
          { key: 'pending', label: 'Pending' },
          { key: 'refunds', label: 'Refunds' },
        ]}
        defaultActive="all"
        onSegmentChange={(key) => console.log('Segment:', key)}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search order Id'
      />


      {/* table Component */}
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>
      
  

    </div>
  )
}