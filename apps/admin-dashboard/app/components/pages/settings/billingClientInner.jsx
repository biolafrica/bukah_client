"use client"

import Link from "next/link";
import { format } from "date-fns";

import { formatNaira } from "../../../utils/format";
import { useBilling } from "../../../hooks/useBilling";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import DataTable from "../../common/dataTable";

export default function BillingClientInner(){

  const columns = [
    { key: 'invoiceID', header: ' Invoice ID', minWidth: '150px', render:row =>row.reference_number },
    { key: 'subscriptionPlan', header: 'Subscription Plan', minWidth: '150px', render: row=>row.plan?.type },
    { key: 'amount', header: 'Amount', minWidth: '150px', render: row =>formatNaira(row.amount) },
    { key: 'dateIssued', header: 'Date Issued', minWidth: '150px', render: row => format(new Date(row.created_at),'dd-MM-yyyy') },
    {
      key: 'status',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const colors = {
          paid: 'bg-green-100 text-green-800',
          failed: 'bg-red-100 text-red-800',
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

  const { items, isLoading, isError, error, } = useBilling()

  if (isError)  return <p>Error: {error.message}</p>

  return(
  <>
    <div className="border border-border-text rounded-md p-3 my-4 ">

      <div className="border border-border-text rounded-md p-5 flex justify-between">
        <div className="flex flex-col gap-1 text-sm font-normal">
          <h4 className="">{items[0].plan.type}</h4>
          <h3 className="font-semibold text-base">{formatNaira(items[0].amount)}/month</h3>
          <h4 className="text-sec-text hidden md:block">{items[0].plan.target}</h4>
        </div>

        <Link href='/plans'><button className="btn btn-filled">Change Plan</button></Link>

      </div>

      <div className="flex items-center justify-between mt-4 border border-border-text rounded-md p-5">
        <div className="flex items-center gap-2 text-xs">
          <CreditCardIcon className="h-5 w-5"/>
          <div>
            <h4 >{items[0].card_type} ending in {items[0].card_last4}</h4>
            <h4 className=" text-sec-text">Expiry date {items[0].exp_month}/{items[0].exp_year}</h4>
          </div>
        </div>

        <Link href="/settings/billing/card-update"><button className="btn btn-outlined">Update Card</button></Link>
      </div>
    </div>

    <div className="border border-border-text rounded-md p-5">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="text-base font-semibold">Next Payment</h4>
      </div>
      <h4 className="text-sm text-sec-text"> { format(new Date(items[0].next_billing_date),'dd-MM-yyyy')}</h4>              
    </div>

    <h4 className="mt-5 mb-3 font-normal">Billing History</h4>
    <DataTable
      columns={columns} 
      data={items} 
      deleteIcon ={false}
      edit={false}
      onMore={()=>console.log("more")}
      loading={isLoading}
    />

    <div className="flex items-center justify-between mt-4 border border-border-text rounded-md p-3">
      <h4 className="text-sm">Your current plan is SME</h4>
      <button className="btn btn-filled bg-red-600 text-white">Cancel Subscription</button>
    </div>
    </>
  )
}