"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import DataTable from "../../components/pages/dataTable";
import { useState } from "react";
import { formatNaira } from "../../utils/format";

export default function Menu() {

  const [segmentedButton, setSegmentedButton] = useState("items")

  const columns =[
    { key: 'category', header: 'Category', minWidth: '200px' },
    { key: 'description', header: 'Description', minWidth: '700px' },
  ];

  const Itemscolumns =[
    { key: 'name', header: 'Name', minWidth: '150px' },
    { key: 'category', header: 'Category', minWidth: '150px' },
    { key: 'description', header: 'Description', minWidth: '300px' },
    { key: 'amount', header: 'Amount', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px' },
  ];

  const data =[
    {
      id: 1,
      category: 'Main',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 2,
      category: 'Rice',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 3,
      category: 'Drink',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 4,
      category: 'Spagetti',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    
  ]

  const itemsData =[
    {
      id: 1,
      name: 'Spagetti Stir Fry',
      category: 'Main',
      description: 'Spagetti Stir Fry',
      amount: formatNaira(2000),
      branch: 'Branch A',
    },
    {
      id: 2,
      name: 'Spagetti Stir Fry',
      category: 'Main',
      description: 'Spagetti Stir Fry',
      amount: formatNaira(5000),
      branch: 'Branch A',
    },

  ]

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
        segments={[
          { key: 'items', label: 'Items' },
          { key: 'categories', label: 'Categories' },
        ]}
        defaultActive="items"
        onSegmentChange={(key) => key === "items" ? setSegmentedButton("items") : setSegmentedButton("description")}
        onSearch={(q) => console.log('Search query:', q)}
        onFilter={() => console.log('Filter clicked')}
        onSort={() => console.log('Sort clicked')}
        searchPlaceholder = 'search order Id'
      />


      {/* Table Component */}

      {segmentedButton === "description" && <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>}
      {segmentedButton === "items" && <DataTable columns={Itemscolumns} data={itemsData} onEdit={handleEdit} onDelete={handleDelete}/>}

    </div>
  )
  
}