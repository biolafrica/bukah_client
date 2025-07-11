
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import HeadingIntro    from '../../components/pages/headingIntro'
import DataTable       from '../../components/pages/dataTable'
import * as outline    from '@heroicons/react/24/outline'
import { menu }        from '../../data/menu'
import SegmentedToolbars from '../../components/pages/segment'


export default function ClientMenuInner({
  segment,
  search,
  branchOptions,
  categoryOptions,
  filters,
  sortConfig,
  tableData,
}) {
  const router = useRouter()
  const params = useSearchParams()  // read-only

  // helper to update URL without full reload
  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(patch).forEach(([k,v]) => {
      if (v == null || v === '') next.delete(k)
      else next.set(k, v)
    })
    router.replace(`?${next.toString()}`)
  }

  return (
    <div className="p-5 pt-30 lg:pl-75">
      <HeadingIntro
        module="Items"
        moduleIntro="Create, update, organize menu items"
        Icon={outline.PlusIcon}
        buttonText="Add Item"
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

          onApply:  () => {},      // data auto-refresh via server
          onClear:  () => updateParams({ branch: '', category: '' }),
          title:    'Filter Items',
        }}

        sortProps={{
          options: segment==='items'?menu.sortOptions:[{key:'name', label:'Name'}],
          sortConfig,
          onSort: key => {
            const dir = sortConfig?.key===key && sortConfig.direction ==='asc'
              ? 'desc'
              : 'asc'
            updateParams({ sortBy:key, direction:dir })
          },
          onClear: () => updateParams({ sortBy:null, direction:null }),
          label: 'Sort',
        }}
      />

      <DataTable
        columns={ segment==='items' 
          ? menu.itemsColumn
          : menu.categoriesColumns}
        data={tableData}
      />
    </div>
  )
}

