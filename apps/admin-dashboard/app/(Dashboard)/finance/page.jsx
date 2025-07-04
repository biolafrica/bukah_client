"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function  Finance() {
  const handleFinanceExport=()=>{}
  return (
    <div className="finance-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Finances" 
        moduleIntro="View and manage all your money in one place" 
        Icon={outline.ArrowUpOnSquareIcon} 
        buttonText="Export"
        branches={false}
        onButtonClick={handleFinanceExport} 
      />

    </div>
  )
}