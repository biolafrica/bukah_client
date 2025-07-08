'use client'

import SettingsNav from "../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../components/pages/settingsHeadingIntro";
import * as solid  from "@heroicons/react/24/solid"
import { formatNaira } from "../../../utils/format";
import DataTable from "../../../components/pages/dataTable";

export default function Billing() {

  const columns = [
    { key: 'invoiceID', header: ' Invoice ID', minWidth: '150px' },
    { key: 'subscriptionPlan', header: 'Subscription Plan', minWidth: '150px' },
    { key: 'amount', header: 'Amount', minWidth: '150px' },
    { key: 'dateIssued', header: 'Date Issued', minWidth: '150px' },
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

  const data =[
    {
      id: 1,
      invoiceID: '#78901',
      subscriptionPlan: 'SME plan',
      amount: formatNaira(30000),
      dateIssued: '30-06-2025',
      status:"paid"
    },
    {
      id: 2,
      invoiceID: '#78901',
      subscriptionPlan: 'SME plan',
      amount: formatNaira(30000),
      dateIssued: '30-05-2025',
      status:"paid"
    },
    {
      id: 3,
      invoiceID: '#78901',
      subscriptionPlan: 'SME plan',
      amount: formatNaira(30000),
      dateIssued: '30-04-2025',
      status:"paid"
    },
    {
      id: 4,
      invoiceID: '#78901',
      subscriptionPlan: 'SME plan',
      amount: formatNaira(30000),
      dateIssued: '30-03-2025',
      status:"failed"
    }
  ];

  const handleDelete =(row)=>{}
  const handleEdit =(row)=>{}
  return (
    <div className="billings_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">

          <div className="border border-border-text rounded-md p-5 bg-white">
            <h3 className="font-semibold text-base border-b border-border-text pb-3 mb-5">Subscription and Billing</h3>
            <h4 className="text-sm text-sec-text">Manage your plan and billing settings</h4>

            <div className="border border-border-text rounded-md p-3 my-4 ">

              <div className="border border-border-text rounded-md p-5 flex justify-between">
                <div className="flex flex-col gap-1 text-xs font-normal">
                  <h4 className="">Intermediate Plan</h4>
                  <h3 className="font-semibold text-base">&#8358;100,000/month</h3>
                  <h4 className="text-sec-text hidden md:block">For restaurants with multi branches and over 20 staff</h4>
                </div>

                <button className="btn btn-filled">Change Plan</button>

              </div>

              <div className="flex items-center justify-between mt-4 border border-border-text rounded-md p-5">
                <div className="flex items-center gap-2 text-xs">
                  <solid.CreditCardIcon className="h-5 w-5"/>
                  <div>
                    <h4 >MasterCard ending in 1245</h4>
                    <h4 className=" text-sec-text">Expiry date 01/26</h4>
                  </div>
                </div>

                <button className="btn btn-outlined">Update Card</button>
              </div>
            </div>

            <div className="border border-border-text rounded-md p-5">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-base font-semibold">Next Payment</h4>
                <button className="btn btn-tonal p-1">30 days left</button>
              </div>
              <h4 className="text-xs text-sec-text"> 7th August 2025</h4>              
            </div>

            <h4 className="mt-5 mb-3 font-normal">Billing History</h4>
            <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete}/>

            <div className="flex items-center justify-between mt-4 border border-border-text rounded-md p-3">
              <h4 className="text-sm">Your current plan is SME</h4>
              <button className="btn btn-filled bg-red-600 text-white">Cancel Subscription</button>
            </div>

          </div>
          
        </div>

      </div>

    </div>
  )
}