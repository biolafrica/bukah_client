"use client"

import * as outline  from "@heroicons/react/24/outline"
import HeadingIntro from "../../components/pages/headingIntro"

export default function Branches() {
  const handleAddBranch =()=>{}

  return (
    <div className="branch-container p-5 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Branches" 
        moduleIntro="Oversee and coordinate all your business location with ease" 
        Icon={outline.PlusIcon} 
        buttonText="Add Branch"
        branches={false}
        onButtonClick={handleAddBranch} 
      />

    </div>
  )
}