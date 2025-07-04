"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import MetricsContainer from "../../components/pages/metricsCont";
import { formatNaira } from "../../utils/format";

export default function  Finance() {


  const handleFinanceExport=()=>{}
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

      


    </div>
  )
}