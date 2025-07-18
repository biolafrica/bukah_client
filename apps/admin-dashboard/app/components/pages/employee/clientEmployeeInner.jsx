"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro     from '../../common/headingIntro'
import SegmentedToolbar from '../../common/segment'
import DataTable        from '../../common/dataTable'
import EmptyState       from '../../common/emptyState'
import Permission from './permission'
import * as outline     from '@heroicons/react/24/outline'
import { useState } from 'react'
import AddEmployee from './addEmployee'
import { employee } from '../../../data/employee'

export default function ClientEmployeeInner({
  segment,
  searchTerm,
  branchOptions,
  filters,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [sideScreenOpen,setSideScreenOpen] = useState(false)

  const filterConfig = employee.filterConfig(branchOptions);

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  const isQuerying = [
    'searchTerm', 'branch', 'isActive', 'role', 'name'
  ].some((k) => {
    const val = params.get(k)
    return val != null && val !== ''
  })


  return (
    <div className="p-5 pt-30 lg:pl-75">

      {sideScreenOpen && (
        <div className='fixed inset-0 z-60 flex'>
          <div className='absolute inset-0 bg-black opacity-50' onClick={()=> setSideScreenOpen(false)}/>

          <div className='relative z-65'>
            <AddEmployee branchOptions={branchOptions} setSideScreenOpen={setSideScreenOpen}/>
          </div>

        </div>

      )}


      <HeadingIntro
        module="Employee"
        moduleIntro="Manage who works in restaurants and their role"
        Icon={outline.PlusIcon}
        buttonText="Add Employee"
        branches={false}
        onButtonClick={() => setSideScreenOpen(true)}
      />

      <SegmentedToolbar
        segments={employee.segment}
        defaultActive={segment}
        onSegmentChange={(key) => updateParams({ segment: key })}
        search={segment === 'employees' ? true : false }
        
        onSearch={(q) => updateParams({ searchTerm: q })}

        filterProps={segment === 'employees' && {
          filters,
          config:   filterConfig,
          onChange: (k, v) => updateParams({ [k]: v }),
          onApply:  () => {},
          onClear:  () => updateParams({ branch:'', isActive:'', role:'', searchTerm:'' }),
          title:    'Filter Employees'
        }}
        sortProps={segment === 'employees' &&{
          options: employee.sortOptions,
          sortConfig,
          onSort:     (key) => {
            const dir = sortConfig?.key === key && sortConfig.direction === 'ascending'
              ? 'descending'
              : 'ascending'
            updateParams({ name: dir })
          },
          onClear:    () => updateParams({ name: null }),
          label:      'Sort'
        }}

        searchPlaceholder="Search employee names"
      />

      {segment === 'permissions' ? (
        <Permission />
      ) : (
        tableData.length === 0 ? (
          <EmptyState
            icon={outline.InboxIcon}
            title={isQuerying ? 'No results found' : 'No employees'}
            description={
              isQuerying
                ? 'Try clearing your filters or search.'
                : 'No employees to display.'
            }
          />
        ) : (
          <DataTable
            columns={employee.columns}
            data={tableData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={(p) => updateParams({ page: p })}
          />
        )
      )}

    </div>
  )
}