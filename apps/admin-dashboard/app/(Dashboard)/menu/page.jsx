"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import DataTable from "../../components/pages/dataTable";
import { useState } from "react";
import  FilterDropdown from "../../components/uiComponents/filter";
import { menu } from "../../data/menu";


export default function Menu() {

  const [filters, setFilters] = useState({branch: '', category: '', })
  const [segmentedButton, setSegmentedButton] = useState("items")

  const handleChange = (key, value) => {setFilters(f => ({ ...f, [key]: value }))}
  const applyFilters = () => {console.log('Applying filters:', filters)}
  const clearFilters = () => {setFilters({ branch: '', category: '', })}
  const handleAddMenu = () =>{}
  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

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
        segments={menu.segment}
        defaultActive="items"
        onSegmentChange={(key) => key === "items" ? setSegmentedButton("items") : setSegmentedButton("description")}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search order Id'
      />


      {/* Table Component */}

      {segmentedButton === "description" && 
        <DataTable 
          columns={menu.descriptionColumns} 
          data={menu.descriptionData} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
        />
      }

      {segmentedButton === "items" && 
        <DataTable 
          columns={menu.itemsColumn} 
          data={menu.itemsData} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
        />
      }

      <FilterDropdown 
        filters={filters} 
        config={menu.config} 
        onChange={handleChange} 
        onApply={applyFilters} 
        onClear={clearFilters} 
        title="Filter Menu Data"
      />

    </div>
  )
  
}