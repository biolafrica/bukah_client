"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function Customers() {
  const handleCustomerExport=()=>{}

  return (
    <div className="customer-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Customers" 
        moduleIntro="Understand your customers to improve service" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export" 
        branches={false}
        onButtonClick={handleCustomerExport}
      />

    </div>
  )
}