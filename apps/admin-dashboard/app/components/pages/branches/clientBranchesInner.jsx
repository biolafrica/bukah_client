'use client'

import HeadingIntro from '../../common/headingIntro'
import DataTable    from '../../common/dataTable'
import EmptyState   from '../../common/emptyState'
import { branch } from '../../../data/branch'

import * as outline from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AddBranches from './addBranches'


export default function ClientBranchesInner({
  tableData,
  totalCount,
  currentPage,
  pageSize,
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [sideScreenOpen,setSideScreenOpen]=useState(false)
  const [editSideScreenOpen,setEditSideScreenOpen]=useState(false)
  const [addSideScreenOpen,setAddSideScreenOpen]=useState(false)
  const [items, setItems] = useState({})


  // Pagination helper
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }


  const hasQuery = tableData.length === 0

  const closeAll=()=>{
    setSideScreenOpen(false)
    setEditSideScreenOpen(false)
    setAddSideScreenOpen(false)
  }

  const handleEditScreen = row=>{
    setItems(row)
    setSideScreenOpen(true)
    setEditSideScreenOpen(true)
    setAddSideScreenOpen(false)
  }

  const handleAddScreen =()=>{
    setSideScreenOpen(true)
    setEditSideScreenOpen(false)
    setAddSideScreenOpen(true)

  }

  return (
    <div className="branch-container p-5 pt-30 lg:pl-75">

      {sideScreenOpen && (
        <div className='fixed inset-0 z-60 flex'>
          <div className='absolute inset-0 bg-black opacity-50' onClick={()=> setSideScreenOpen(false)}/>

          <div className='relative z-65'>

            {addSideScreenOpen && (
              <AddBranches onClose={closeAll}/>
            )}

            {editSideScreenOpen && (
              <AddBranches onClose={closeAll} row={items} />
            )}
          
          </div>

        </div>

      )}

      <div className='flex flex-col gap-4'>
        <HeadingIntro
          module="Branches"
          moduleIntro="Oversee and coordinate all your business locations with ease"
          Icon={outline.PlusIcon}
          buttonText="Add Branch"
          branches={false}
          onButtonClick={handleAddScreen}
        />

        {tableData.length === 0 ? (
          <EmptyState
            icon={outline.BuildingStorefrontIcon}
            title={hasQuery ? 'No branches found' : 'No branches'}
            description={hasQuery ? 'Try changing your query.' : 'Add a branch to get started.'}
          />
        ) : (
          <DataTable
            columns={branch.columns}
            data={tableData}
            onEdit={handleEditScreen}
            onDelete={()=>console.log("delete")}
            moreIcon ={false}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={(p) => updateParams({ page: p })}
          />
        )}
      </div>

    </div>
  )
}