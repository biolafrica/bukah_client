"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";

export default function Employee() {
  const handleAddEmployee=()=>{}
  return (
    <div className="employee-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Employee" 
        moduleIntro="Manage who works in restaurants and their role" 
        Icon={outline.PlusIcon} 
        buttonText="Add Employee"
        branches={false} 
        onButtonClick={handleAddEmployee}
      />

      {/* Segmented Buttons and filter Component */}
      <SegmentedToolbar
        segments={[
          { key: 'employee', label: 'Employee' },
          { key: 'permissions', label: 'Permissions' },
        ]}
        defaultActive="employee"
        onSegmentChange={(key) => console.log('Segment:', key)}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search names'

      />


      {/* Table Component */}

    </div>
  )
}