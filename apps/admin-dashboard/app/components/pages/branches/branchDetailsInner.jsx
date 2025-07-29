"use client"

import { useQuery } from '@tanstack/react-query';

import { formatNaira, formatNumber } from "../../../utils/format";
import EmptyState from '../../common/emptyState';
import ListingCard from '../../common/listCard';
import { UserCircleIcon } from '@heroicons/react/24/solid';

import { useBranchStaff } from '../../../hooks/useBranch';


export function BranchDetailsMetrics({id}){

  const { data: metricData, isLoading } = useQuery({
    queryKey: ['branch-metrics'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/branches/metrics/${id}`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const json = await res.json();
      return json.branches;
    }
  });

  const branchMetrics =[
    {label:"Total Amount Sold", value:formatNaira(isLoading ? 0 : metricData.transactions)},
    {label:"Total Orders", value:`${formatNumber(isLoading ? 0 : metricData.orders)} orders`},
    {label:"Total Customers", value:formatNumber(isLoading ? 0 : metricData.customers)},
  ]

  return(
    <div className="metric_container border border-border-text rounded-md p-3 flex felx-1 ">
      {branchMetrics.map(({label,value},i)=>(
        <div className={`px-5 ${i===2 ? "": "border-r border-border-text"} flex-1`} key={label}>
          <h4 className="text-xs text-sec-text mb-3">{label}</h4>
          <h4 className="text-xl">{value}</h4>
        </div>
      ))}
    </div>
  )
}

export function BranchListCards({id}){
  const { items, isLoading, isError, error} = useBranchStaff(id)
  if (isError) return <p>Error: {error.message}</p>

  return(
    <>
      {isLoading || items.length === 0 ? (
          <EmptyState
            icon={UserCircleIcon}
            title={isLoading ? 'loading employee': 'No Employee added yet'}
            description='Employee list will appear here'
          />
        ):(
          <ListingCard items={items}/>  
        ) }
    </>
  )
}