"use client"

import * as outline  from "@heroicons/react/24/outline"
import HeadingIntro from "../../components/pages/headingIntro"
import SegmentedToolbar from "../../components/pages/segmentedToolbar"
import DataTable from "../../components/pages/dataTable"

export default function Branches() {
  const handleAddBranch =()=>{}
  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

  const columns =[
    { key: 'name', header: 'Name', minWidth: '150px' },
    { key: 'supervisor', header: 'Supervisor', minWidth: '150px' },
    { key: 'address', header: 'Address', minWidth: '300px' },
    { key: 'dateAdded', header: 'Date Added', minWidth: '150px' },
  ];

  const data =[
    {
      id: 1,
      name: 'Branch A',
      supervisor: 'Alice Smith',
      address: '7, Adedibu Street, Oldham',
      dateAdded: '26-05-2025',
    },
    {
      id: 2,
      name: 'Branch B',
      supervisor: 'Bob Johnson',
      address: '15, Baker Street, London',
      dateAdded: '23-05-2025',
    },
    {
      id: 3,
      name: 'Branch C',
      supervisor: 'Adewunmi Taiwo',
      address: '15, Baker Street, London',
      dateAdded: '23-05-2025',
    },
  ]


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

      {/* Table Component */}
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>

    </div>
  )
}