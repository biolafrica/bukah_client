"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNumber } from "../../utils/format";

export default function Customers() {
  const handleCustomerExport=()=>{}

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

    </div>
  )
}