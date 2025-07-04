"use client"

import * as outline  from "@heroicons/react/24/outline"
import HeadingIntro from "../../components/pages/headingIntro"
import SegmentedToolbar from "../../components/pages/segmentedToolbar"

export default function Branches() {
  const handleAddBranch =()=>{}

  return (
    <div className="branch-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Branches" 
        moduleIntro="Oversee and coordinate all your business location with ease" 
        Icon={outline.PlusIcon} 
        buttonText="Add Branch"
        branches={false}
        onButtonClick={handleAddBranch} 
      />

      {/* Segmented Buttons and filter Component */}
      <SegmentedToolbar
        segments={[]}
        defaultActive=""
        onSegmentChange={(key) => console.log('Segment:', key)}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search branch name'
      />

    </div>
  )
}