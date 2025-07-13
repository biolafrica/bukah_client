"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro     from '../headingIntro'
import SegmentedToolbar from '../segment'
import DataTable        from '../dataTable'
import EmptyState       from '../../common/emptyState'
import Permission from './permission'
import * as outline     from '@heroicons/react/24/outline'

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

  // Filter config for employees
  const filterConfig = [
    {
      key:    'branch',
      label:  'Branch',
      type:   'select',
      options: branchOptions,
    },
    {
      key:    'isActive',
      label:  'Status',
      type:   'select',
      options: [
        { value: 'true',  label: 'Active'   },
        { value: 'false', label: 'Inactive' },
      ],
    },
    {
      key:    'role',
      label:  'Role',
      type:   'select',
      options: [
        { value: '',          label: 'All Roles' },
        { value: 'admin',     label: 'Admin'     },
        { value: 'manager',   label: 'Manager'   },
        { value: 'waiter',    label: 'Waiter'    },
        { value: 'chef',      label: 'Chef'      },
        { value: 'bartender', label: 'Bartender' },
        { value: 'supervisor',label: 'Supervisor'},
      ],
    },
  ]

  // Sort options: only name
  const sortOptions = [
    { key: 'name', label: 'Name' },
  ]

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

  // Columns for DataTable
  const columns = [
    {
      key: 'name',
      header: 'Name',
      minWidth: '150px',
      render: row => `${row.first_name} ${row.last_name}`
    },
    { key: 'role',           header: 'Role',            minWidth: '150px' },
    { key: 'email',          header: 'Email',           minWidth: '200px' },
    {
      key: 'branch',
      header: 'Branch',
      minWidth: '150px',
      render: row => (
        row.branch.length > 0
          ? row.branch.map(b => b.name).join(', ')
          : '-'  
      )
    },
    {
      key: 'created_at',
      header: 'Date Registered',
      minWidth: '150px',
      render: row => new Date(row.created_at).toLocaleDateString('en-GB')
    },
    {
      key: 'isActive',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const cls = row.is_active
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {row.is_active ? 'Active' : 'Inactive'}
          </span>
        )
      }
    }
  ]

  return (
    <div className="p-5 pt-30 lg:pl-75">
      <HeadingIntro
        module="Employee"
        moduleIntro="Manage who works in restaurants and their role"
        Icon={outline.PlusIcon}
        buttonText="Add Employee"
        branches={false}
        onButtonClick={() => updateParams({})}
      />

      <SegmentedToolbar
        segments={[
          { key: 'employees',   label: 'Employees'   },
          { key: 'permissions', label: 'Permissions' }
        ]}
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
          options:    sortOptions,
          sortConfig,
          onSort:     (key) => {
            const dir = sortConfig?.key === key && sortConfig.direction === 'asc'
              ? 'desc'
              : 'asc'
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
            columns={columns}
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