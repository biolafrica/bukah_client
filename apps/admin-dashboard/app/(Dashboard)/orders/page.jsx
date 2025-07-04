"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";

export default function Orders(){
  const handleOrderExport=()=>{}

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

    </div>
  )
}