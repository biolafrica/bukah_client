'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro    from '../../common/headingIntro'
import DataTable       from '../../common/dataTable'
import * as outline    from '@heroicons/react/24/outline'
import { menu }        from '../../../data/menu'
import SegmentedToolbars from '../../common/segment'
import EmptyState from '../../common/emptyState'
import { useState } from 'react'
import AddItems from './addItems'
import AddComboItems from './addComboItems'
import ItemDetails from './itemDetails'
import { useOptions } from '../../context/optionsContext'


export default function ClientMenuInner({
  segment,
  search,
  filters,
  sortConfig,
  tableData,
  totalCount,
  currentPage,
  pageSize,
}) {
  const router = useRouter()
  const params = useSearchParams()

  const { branchOptions, categoryOptions } = useOptions()

  const [sideScreenOpen, setSideScreenOpen] = useState(false)
  const [itemSideScreenOpen, setItemSideScreenOpen] = useState(false)
  const [comboSideScreenOpen, setComboSideScreenOpen] = useState(false)
  const [detailsSideScreenOpen, setDetailsSideScreenOpen] = useState(false)

  const closeAll = () => {
    setSideScreenOpen(false)
    setItemSideScreenOpen(false)
    setComboSideScreenOpen(false)
    setDetailsSideScreenOpen(false)
  }

  const handleSingleScreen = () => {
    setSideScreenOpen(true)
    setItemSideScreenOpen(true)
    setComboSideScreenOpen(false)
    setDetailsSideScreenOpen(false)
  }

  const handleComboScreen = () => {
    setSideScreenOpen(true)
    setComboSideScreenOpen(true)
    setItemSideScreenOpen(false)
    setDetailsSideScreenOpen(false)
  }

  const handleMoreScreen = (row) => {
    console.log('details for', row)
    setSideScreenOpen(true)
    setDetailsSideScreenOpen(true)
    setItemSideScreenOpen(false)
    setComboSideScreenOpen(false)
  }

  const handleEdit = (row) => {
    if (row.is_combo) handleComboScreen()
    else              handleSingleScreen()
  }


  // helper to update URL without full reload
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k,v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  const isQuerying = [
    'search', 'category', 'branch',
  ].some((k) => {
    const val = params.get(k)
    return val != null && val !== ''
  })


  return (
    <div className="p-5 pt-30 lg:pl-75">

      {sideScreenOpen && (
        <div className='fixed inset-0 z-60 flex'>
          <div 
            className='absolute inset-0 bg-black opacity-50'
            onClick={closeAll}
          />

          <div className='relative z-65'>

            {itemSideScreenOpen && (
              <AddItems 
                onClose= {closeAll}
              />
            )}

            {comboSideScreenOpen && (
              <AddComboItems onClose= {closeAll}/>
            )}

            {detailsSideScreenOpen && (
              <ItemDetails onClose= {closeAll}/>
            )}

          </div>

        </div>
      )}

      <HeadingIntro
        module="Items"
        moduleIntro="Create, update, organize menu items"
        Icon={outline.PlusIcon}
        buttonText="Add Item"
        finalOptions={[
          {label: "single item", onClick:handleSingleScreen}, 
          {label: "combo meal", onClick:handleComboScreen}
        ]}
      />

      <SegmentedToolbars
        segments={menu.segment}
        defaultActive={segment}

        onSegmentChange={key => updateParams({ segment: key })}

        onSearch={q => updateParams({ search: q })}

        filterProps={ segment === 'items' && {
          filters,
          config: [
            { key:'branch',   label:'Branch',   type:'select', options: branchOptions },

            { key:'category', label:'Category', type:'select', options: categoryOptions },
          ],
          
          onChange: (k, v) => updateParams({ [k]: v }),

          onApply:  () => {},
          onClear:  () => updateParams({ branch: '', category: '' }),
          title:    'Filter Items',
        }}

        sortProps={{
          options: segment ==='items' ? menu.sortOptions:[{key:'name', label:'Name'}],
          sortConfig,
          onSort: key => {
            const dir = sortConfig?.key===key && sortConfig.direction ==='ascending'
              ? 'descending'
              : 'ascending'
            updateParams({ name:dir })
          },
          onClear: () => updateParams({  name:null}),
          label: 'Sort',
        }}

      />

      {tableData.length === 0 && 
        <EmptyState
          icon={outline.InboxIcon}
          title={isQuerying ? 'No results found' : 'No items yet'}
          description={isQuerying ? 'Try clearing your filters or search terms.' : "No items created yet."}
        />
      }

      {tableData.length !== 0 && 
        <DataTable
          columns={ segment==='items' 
            ? menu.itemsColumn
            : menu.categoriesColumns
          }
          data={tableData}
          onEdit={handleEdit}
          onDelete={()=>console.log("delete")}
          onMore={handleMoreScreen}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={(newPage) => updateParams({ page: newPage })}
        />
      }

    </div>
  )
}

