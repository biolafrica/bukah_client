"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function Employee() {
  const handleAddEmployee=()=>{}
  return (
    <div className="employee-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Employee" 
        moduleIntro="Manage who works in restaurants and their role" 
        Icon={outline.PlusIcon} 
        buttonText="Add Employee"
        branches={false} 
        onButtonClick={handleAddEmployee}
      />

    </div>
  )
}