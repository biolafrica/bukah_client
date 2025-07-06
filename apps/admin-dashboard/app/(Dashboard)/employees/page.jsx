"use client"

import HeadingIntro from "../../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import SegmentedToolbar from "../../components/pages/segmentedToolbar";
import DataTable from "../../components/pages/dataTable";

export default function Employee() {
  const handleAddEmployee=()=>{}
  const handleEdit =(row)=>{}
  const handleDelete =(row)=>{}

  const columns = [
    { key: 'name', header: 'Name', minWidth: '150px' },
    { key: 'role', header: 'Role', minWidth: '150px' },
    { key: 'email', header: 'Email', minWidth: '200px' },
    { key: 'branch', header: 'Branch', minWidth: '150px' },
    { key: 'dateRegistered', header: 'Date Registered', minWidth: '150px' },
    {
      key: 'status',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const colors = {
          active:  'bg-green-100 text-green-800',
          inactive:   'bg-red-100 text-red-800',
        }
        const cls = colors[row.status] || 'bg-gray-100 text-gray-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {row.status}
          </span>
        )
      }
    },
  ];

  const data =[
    {
      id: 1,
      name: 'Adekunle Johnson',
      role: 'Chef',
      email: 'ajohnson@gmail.com',
      branch: 'branch B',
      dateRegistered: '26-05-2025',
      status: "active"
    },
    {
      id: 2,
      name: 'Folake Abimbola',
      role: 'Supervisor',
      email: 'folakeabimbola@hotmail.com',
      branch: 'branch A',
      dateRegistered: '26-04-2025',
      status: "inactive"
    },
    {
      id: 3,
      name: 'Kunle Afolabi',
      role: 'Manager',
      email: 'kafolabi@bukah.co',
      branch: 'Branch D',
      dateRegistered: '26-03-2024',
      status: "active"
    },
  
  ]


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
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>


    </div>
  )
}