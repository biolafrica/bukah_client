"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNaira, formatNumber } from "../../utils/format";
import DataTable from "../../components/pages/dataTable";

export default function Customers() {

  const columns =[
    { key: 'name', header: 'Name', minWidth: '200px' },
    { key: 'totalOrders', header: 'Total Orders', minWidth: '150px' },
    { key: 'totalSpent', header: 'Total Spent', minWidth: '150px' },
    { key: 'dateRegistered', header: 'Date Registered', minWidth: '150px' },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      totalOrders: formatNumber(220),
      totalSpent: formatNaira(90000),
      dateRegistered: "26-05-2025",
    },
    {
      id: 2,
      name: "Ade Doe",
      totalOrders: formatNumber(120),
      totalSpent: formatNaira(70000),
      dateRegistered: "26-02-2024",
    },
    {
      id: 3,
      name: "Lateef Doe",
      totalOrders: formatNumber(1200),
      totalSpent: formatNaira(800000),
      dateRegistered: "26-03-2024",
    },
    {
      id: 4,
      name: "Dare Doe",
      totalOrders: formatNumber(520),
      totalSpent: formatNaira(1200000),
      dateRegistered: "26-04-2023",
    },
  
  ]

  const handleCustomerExport=()=>{}
  const handleDelete=()=>{}
  const handleEdit=()=>{}

  return (
    <div className="customer-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Customers" 
        moduleIntro="Understand your customers to improve service" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={false}
        onButtonClick={handleCustomerExport}
      />

      {/* Transaction Metrics components */}
      <MetricsContainer
        metrics={[
          { label: 'Total Customers', value: formatNumber(312), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
          { label: 'Registered', value: formatNumber(300), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
          { label: 'Guest', value: formatNumber(12), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
        ]}
      />



      {/* Segmented Buttons and filter Component */}
      <SegmentedToolbar
        segments={[
          { key: 'all', label: 'All' },
          { key: 'registered', label: 'Registered' },
          { key: 'guest', label: 'Guest' },
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