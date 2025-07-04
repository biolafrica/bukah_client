"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function Orders(){
  const handleOrderExport=()=>{}

  return (
    <div className="order-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Items" 
        moduleIntro="View and monitors all orders across channels" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={true}
        onButtonClick={handleOrderExport}
      />

    </div>
  )
}