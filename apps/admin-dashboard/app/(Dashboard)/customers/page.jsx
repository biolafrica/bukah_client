// app/customers/page.jsx (Server Component)

import ClientCustomerInner from "../../components/pages/customers/clientCustomer"
import { formatNumber } from "../../utils/format"


export const dynamic = 'force-dynamic'

export default async function CustomersPage({ searchParams }) {
  const {
    segment     = 'all',        // 'all' | 'registered' | 'guest'
    search      = '',
    dateRange   = '',
    sortBy      = '',           // 'totalOrders' | 'totalSpent'
    direction   = '',           // 'asc' | 'desc'
    page        = '0',
  } = await searchParams

  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  // Build shared params
  const params = new URLSearchParams()
  if (segment !== 'all') params.set('type', segment)
  if (search)      params.set('searchTerm', search)
  if (dateRange)   params.set('dateRange', dateRange)
  if (sortBy)      params.set(sortBy, direction || 'asc')
  params.set('range', `${start},${end}`)

  // Fetch main customer list
  const listRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers?${params}`
  )
  const listJson      = await listRes.json()
  const tableData     = listJson.data.data
  const totalCount    = listJson.data.count

  // Fetch top customers by orders/spending
  const topsRes       = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers/tops`
  )
  const topsJson      = await topsRes.json()
  const topOrders     = topsJson.data.most_orders.data
  const topSpenders   = topsJson.data.top_spenders.data

  // Fetch customer metrics
  const metrics=[
    { label: 'Total Customers', value: formatNumber(312), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
    { label: 'Registered', value: formatNumber(300), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
    { label: 'Guest', value: formatNumber(12), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
  ]

  return (
    <ClientCustomerInner
      segment={segment}
      search={search}
      dateRange={dateRange}
      sortBy={sortBy}
      direction={direction}
      tableData={tableData}
      totalCount={totalCount}
      currentPage={pageIdx}
      pageSize={pageSize}
      topOrders={topOrders}
      topSpenders={topSpenders}
      metrics={metrics}
    />
  )
}


{/*import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNaira, formatNumber } from "../../utils/format";
import DataTable from "../../components/pages/dataTable";
import ListingCard from "../../components/pages/listCard";

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
  
  ];

  const topCustomers = [
    { id: 1, name: 'Chinedu Daniel', role: 'Waiter', countText: '100 orders' },
    { id: 2, name: 'Ada Lovelace', role: 'Chef', countText: '95 orders' },
    { id: 3, name: 'Ada Lovelace', role: 'Chef', countText: '95 orders' },
    { id: 4, name: 'Ada Lovelace', role: 'Chef', countText: '95 orders' },
    { id: 5, name: 'Ada Lovelace', role: 'Chef', countText: '95 orders' },
 
  ]
  
  const spenderCustomers = [
    { id: 1, name: 'Chinedu Daniel', role: 'Registered', countText: formatNaira(120000) },
    { id: 2, name: 'Ada Lovelace', role: 'Guest', countText: formatNaira(100000) },
    { id: 3, name: 'Ada Lovelace', role: 'Guest', countText: formatNaira(80000) },
    { id: 4, name: 'Ada Lovelace', role: 'Registered', countText: formatNaira(70000) },
    { id: 5, name: 'Ada Lovelace', role: 'Registered', countText: formatNaira(20000) },
 
  ]

  const handleCustomerExport=()=>{}
  const handleDelete=()=>{}
  const handleEdit=()=>{}

  return (
    <div className="customer-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component 
      <HeadingIntro 
        module="Customers" 
        moduleIntro="Understand your customers to improve service" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={false}
        onButtonClick={handleCustomerExport}
      />

      <div className="flex gap-5">

        <div className="flex-1 lg:w-4/7">
          {/* Transaction Metrics components 
          <MetricsContainer
            metrics={[
              { label: 'Total Customers', value: formatNumber(312), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
              { label: 'Registered', value: formatNumber(300), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
              { label: 'Guest', value: formatNumber(12), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
            ]}
          />

          {/* Segmented Buttons and filter Component 
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

          {/* Table Component *
          <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>

        <div className=" hidden lg:block lg:w-2/7 pt-5 ">
          <ListingCard title="Top Customers - Most Orders" items={topCustomers}/>
          <ListingCard title="Top Customers - Highest Spenders" items={spenderCustomers}/>
        </div>

      </div>

    </div>
  )
}*/}