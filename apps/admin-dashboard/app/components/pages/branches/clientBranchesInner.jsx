
'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro from '../../common/headingIntro'
import DataTable    from '../../common/dataTable'
import EmptyState   from '../../common/emptyState'
import * as outline from '@heroicons/react/24/outline'

export default function ClientBranchesInner({
  tableData,
  totalCount,
  currentPage,
  pageSize,
}) {
  const router = useRouter()
  const params = useSearchParams()

  // Pagination helper
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  // CRUD action placeholders
  const handleAddBranch = () => console.log('Add branch')
  const handleEdit      = (row) => console.log('Edit branch', row)
  const handleDelete    = (row) => console.log('Delete branch', row)

  // Table columns
  const columns = [
    { key: 'name',       header: 'Name',       minWidth: '150px' },
    { key: 'address',    header: 'Address',    minWidth: '300px' },
    {
      key:    'created_at',
      header: 'Date Added',
      minWidth: '150px',
      render: row => new Date(row.created_at).toLocaleDateString('en-GB')
    },
    {
      key:    'is_active',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const cls   = row.is_active
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        const label = row.is_active ? 'Active' : 'Inactive'
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
          >
            {label}
          </span>
        )
      }
    },
  ]

  const hasQuery = tableData.length === 0

  return (
    <div className="branch-container p-5 pt-30 lg:pl-75">
      <div className='flex flex-col gap-4'>
        <HeadingIntro
          module="Branches"
          moduleIntro="Oversee and coordinate all your business locations with ease"
          Icon={outline.BuildingStorefrontIcon}
          buttonText="Add Branch"
          branches={false}
          onButtonClick={handleAddBranch}
        />

        {tableData.length === 0 ? (
          <EmptyState
            icon={outline.BuildingStorefrontIcon}
            title={hasQuery ? 'No branches found' : 'No branches'}
            description={hasQuery ? 'Try changing your query.' : 'Add a branch to get started.'}
          />
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
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