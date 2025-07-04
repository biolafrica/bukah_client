"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function Menu() {
  const handleAddMenu = () =>{}
  return (
    <div className="menu-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Items" 
        moduleIntro="Create, update, organize individual menu items effortlessly" 
        Icon={outline.PlusIcon} 
        buttonText="Add Item" 
        branches={false}
        onButtonClick={handleAddMenu}
      />

    </div>
  )
  
}