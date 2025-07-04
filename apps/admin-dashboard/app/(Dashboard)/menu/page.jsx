"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";

export default function Menu() {
  const handleAddMenu = () =>{}

  return (
    <div className="menu-container p-5 pt-30 lg:pl-75">
      
      {/* Module Intro component */}
      <HeadingIntro 
        module="Items" 
        moduleIntro="Create, update, organize individual menu items effortlessly" 
        Icon={outline.PlusIcon} 
        buttonText="Add Item" 
        branches={false}
        onButtonClick={handleAddMenu}
      />

      {/* Segmented Buttons and filter Component */}

      <SegmentedToolbar
        segments={[
          { key: 'items', label: 'Items' },
          { key: 'categories', label: 'Categories' },
        ]}
        defaultActive="items"
        onSegmentChange={(key) => console.log('Segment:', key)}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search order Id'
      />

    </div>
  )
  
}