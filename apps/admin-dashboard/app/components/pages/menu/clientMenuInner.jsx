'use client'
import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import HeadingIntro    from '../../common/headingIntro'
import DataTable       from '../../common/dataTable'
import SegmentedToolbars from '../../common/segment'
import EmptyState from '../../common/emptyState'
import AddItems from './addItems'
import AddComboItems from './addComboItems'
import AddCategory from './addCategory'
import LoadingSpinner from '../../common/loadingSpinner'

import { usePaginatedTable } from '../../../hooks/usePaginatedTable'
import { useMenuOptions } from '../../../hooks/useMenuOption'

import * as outline from '@heroicons/react/24/outline'
import { menu }  from '../../../data/menu'



export default function ClientMenuInner({
  segment,
  search,
  filters,
  sortConfig,
  currentPage,
  pageSize,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sideScreenOpen, setSideScreenOpen] = useState(false);
  const [itemSideScreenOpen, setItemSideScreenOpen] = useState(false);
  const [comboSideScreenOpen, setComboSideScreenOpen] = useState(false);
  const [categorySideScreenOpen, setCategorySideScreenOpen] = useState(false);
  const [item, setItem]= useState(null)

  const endpoint = segment === 'items' ? '/api/products' : '/api/product-categories';

  const queryFilters = useMemo(() => ({
    ...(search && { searchTerm: search }),
    ...(segment === 'items' && filters),
    ...(sortConfig?.key && { [sortConfig.key]: sortConfig.direction }),
  }), [search, filters, sortConfig, segment]);

  const { data, isLoading } = usePaginatedTable({
    key: segment === 'items' ? 'menu-items' : 'menu-categories',
    endpoint,
    page: currentPage,
    pageSize,
    filters: queryFilters,
  });

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    router.replace(`?${next.toString()}`);
  };

  const isQuerying = ['search', 'category', 'branch'].some((k) => {
    const val = params.get(k);
    return val && val !== '';
  });

  const { branchOptions, categoryOptions, loading, error } = useMenuOptions();

  //if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("category options ,", categoryOptions)
  
  const config = menu.config(branchOptions, categoryOptions);

  const closeAll = () => {
    setSideScreenOpen(false);
    setItemSideScreenOpen(false);
    setComboSideScreenOpen(false);
    setCategorySideScreenOpen(false)
  };

  const handleSingleScreen = () => {
    setSideScreenOpen(true);
    setItemSideScreenOpen(true);
    setComboSideScreenOpen(false);
    setCategorySideScreenOpen(false)
  };

  const handleComboScreen = () => {
    setSideScreenOpen(true);
    setComboSideScreenOpen(true);
    setItemSideScreenOpen(false);
    setCategorySideScreenOpen(false)
  };

  const handleCategoryScreen = () => {
    setSideScreenOpen(true);
    setComboSideScreenOpen(false);
    setItemSideScreenOpen(false);
    setCategorySideScreenOpen(true)
  };

  const handleEdit = (row) => {
    setItem(row)
    if (row.is_combo) handleComboScreen();
    else handleSingleScreen();
  };

  const handleCategoryEdit = (row)=>{
    setItem(row)
    handleCategoryScreen()
  }


  return (
    <div className="p-5 pt-30 lg:pl-75">
      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeAll} />
          <div className="relative z-65">
            {itemSideScreenOpen && <AddItems onClose={closeAll} data={item} />}
            {comboSideScreenOpen && <AddComboItems onClose={closeAll} />}
            {categorySideScreenOpen && <AddCategory onClose={closeAll} data={item} />}
          </div>
        </div>
      )}

      <HeadingIntro
        module={segment === "items" ? "Items" : "Categories"}
        moduleIntro={segment === "items" ? "Create, update, organize menu items" : "Group and manage your items under intuitive categories for better organization"}
        Icon={outline.PlusIcon}
        buttonText={segment === "items" ? "Add Item" : "Add category"}
        finalOptions={segment === "items" && ([
          { label: 'single item', onClick: handleSingleScreen },
          { label: 'combo meal', onClick: handleComboScreen },
        ])}
        onButtonClick={segment !== "items" && handleCategoryScreen}
      />

      <SegmentedToolbars
        segments={menu.segment}
        defaultActive={segment}
        onSegmentChange={(key) => updateParams({ segment: key })}
        onSearch={(q) => updateParams({ search: q })}
        filterProps={
          segment === 'items' && {
            filters,
            config,
            onChange: (k, v) => updateParams({ [k]: v }),
            onApply: () => {},
            onClear: () => updateParams({ branch: '', category: '' }),
            title: 'Filter Items',
          }
        }
        sortProps={{
          options: segment === 'items' ? menu.sortOptions : [{ key: 'name', label: 'Name' }],
          sortConfig,
          onSort: (key) => {
            const dir =
              sortConfig?.key === key && sortConfig.direction === 'ascending'
                ? 'descending'
                : 'ascending';
            updateParams({ name: dir });
          },
          onClear: () => updateParams({ name: null }),
          label: 'Sort',
        }}
        searchPlaceholder="Search name"
      />

      {isLoading ? (
        <LoadingSpinner/>
      ) : !data?.data?.length ? (
        <EmptyState
          icon={outline.InboxIcon}
          title={isQuerying ? 'No results found' : 'No items yet'}
          description={
            isQuerying ? 'Try clearing your filters or search terms.' : 'No items created yet.'
          }
        />
      ) : (
        <DataTable
          columns={segment === 'items' ? menu.itemsColumn : menu.categoriesColumns}
          data={data.data}
          onEdit={segment === 'items' ? handleEdit : handleCategoryEdit}
          onDelete={() => console.log('delete')}
          moreIcon={false}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={data.count}
          onPageChange={(newPage) => updateParams({ page: newPage })}
        />
      )}
    </div>
  );
}

