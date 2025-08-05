import { CheckIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon, CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function NotificationAlert(){
  return(
    <div className="w-[400px] rounded-lg border border-border-text text-sm bg-white">

      <h4 className="p-3 border-b border-border-text text-base font-semibold">All Notifications</h4>

      <div className="p-3 border-b border-border-text flex items-center justify-between">

        <div className="flex gap-3">
          <button className="py-1 px-3 rounded-md bg-[#E2E6E9]">All</button>
          <button className="text-sec-text">Unread (2)</button>
        </div>

        <div>
          <button className="text-green-600 font-sans flex items-center">
            Mark all as read
            <CheckIcon className="w-4 h-4"/>
          </button>
          
        </div>
       
      </div>

      <div className="p-5 flex flex-col gap-5">

        <div className="bg-[#F4F7F9] rounded-xl flex items-center gap-3 p-3">

          <div className="bg-[#E2E6E9] rounded-full h-[40px] w-[40px] flex items-center justify-center">
            <CreditCardIcon className="w-6 h-6 text-[#1C274C]"/>
          </div>

          <div className="w-5/6">
            <p>Your Payment was successfully processed and is now complete</p>
            <h4 className="text-xs text-sec-text">06 June, 2025</h4>
          </div>
          
        </div>

        <div className="P-3 rounded-xl flex items-center gap-3 p-3">

          <div className="bg-[#E2E6E9] rounded-full h-[40px] w-[40px] flex items-center justify-center">
            <CreditCardIcon className="w-6 h-6 text-[#1C274C]"/>
          </div>

          <div className="w-5/6">
            <p>Your Payment was successfully processed and is now complete</p>
            <h4 className="text-xs text-sec-text">06 June, 2025</h4>
          </div>
          
        </div>

        <div className="P-3 rounded-xl flex items-center gap-3 p-3">
          <div className="bg-[#FFE5C7] rounded-full h-[40px] w-[40px] flex items-center justify-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-[#E3800B]"/>
          </div>

          <div className="w-5/6">
            <p>Your sunscription ends in 5days</p>
            <h4 className="text-xs text-sec-text">07 June, 2025</h4>
          </div>
          
        </div>

        <div className="P-3 rounded-xl flex items-center gap-3 p-3">
          <div className="bg-[#FFE5C7] rounded-full h-[40px] w-[40px] flex items-center justify-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-[#E3800B]"/>
          </div>

          <div className="w-5/6">
            <p>Your sunscription ends in 5days</p>
            <h4 className="text-xs text-sec-text">07 June, 2025</h4>
          </div>
          
        </div>

      </div>

    </div>
  )
}