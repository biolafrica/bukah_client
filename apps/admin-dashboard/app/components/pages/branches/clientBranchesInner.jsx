'use client'

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

import HeadingIntro from '../../common/headingIntro'
import DataTable    from '../../common/dataTable'
import EmptyState   from '../../common/emptyState'
import AddBranches from './addBranches'

import { usePaginatedTable } from '../../../hooks/usePaginatedTable'
import * as outline from '@heroicons/react/24/outline'
import { branch } from '../../../data/branch'



export default function ClientBranchesInner({ currentPage, pageSize }) {
  const router = useRouter();
  const params = useSearchParams();

  const [sideScreenOpen, setSideScreenOpen] = useState(false);
  const [editSideScreenOpen, setEditSideScreenOpen] = useState(false);
  const [addSideScreenOpen, setAddSideScreenOpen] = useState(false);
  const [items, setItems] = useState({});

  const { data, isLoading } = usePaginatedTable({
    key: 'branches',
    endpoint: '/api/branches',
    page: currentPage,
    pageSize,
    filters: {},
  });

  const updateParams = (patch) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v == null || v === '') next.delete(k);
      else next.set(k, v);
    });
    router.replace(`?${next.toString()}`);
  };

  const closeAll = () => {
    setSideScreenOpen(false);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(false);
  };

  const handleEditScreen = (row) => {
    setItems(row);
    setSideScreenOpen(true);
    setEditSideScreenOpen(true);
    setAddSideScreenOpen(false);
  };

  const handleAddScreen = () => {
    setSideScreenOpen(true);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(true);
  };

  const hasQuery = !isLoading && data?.data?.length === 0;

  return (
    <div className="branch-container p-5 pt-30 lg:pl-75">
      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSideScreenOpen(false)} />
          <div className="relative z-65">
            {addSideScreenOpen && <AddBranches onClose={closeAll} />}
            {editSideScreenOpen && <AddBranches onClose={closeAll} row={items} />}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <HeadingIntro
          module="Branches"
          moduleIntro="Oversee and coordinate all your business locations with ease"
          Icon={outline.PlusIcon}
          buttonText="Add Branch"
          branches={false}
          onButtonClick={handleAddScreen}
        />

        {!data?.data?.length ? (
          <EmptyState
            icon={outline.BuildingStorefrontIcon}
            title={hasQuery ? 'No branches found' : 'No branches'}
            description={hasQuery ? 'Try changing your query.' : 'Add a branch to get started.'}
          />
        ) : (
          <DataTable
            columns={branch.columns}
            data={data.data}
            onEdit={handleEditScreen}
            onDelete={() => console.log('delete')}
            moreIcon={false}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={data.count}
            onPageChange={(p) => updateParams({ page: p })}
          />
        )}
      </div>
    </div>
  );
}
