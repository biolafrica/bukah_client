import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import CloseButton from "../../common/closeButton";
import { BranchDetailsMetrics, BranchListCards } from "./branchDetailsInner";

export default function BranchDetails({onClose, row}){

  const branchEnteries =[
    {label:"Name", value:row.name},
    {label:"Type", value:`${row.offers_eatin ? "Dine In, ": ""} ${row.offers_pickup ? "Pickup": ""}`},
    {label:"Phone Number", value:row.phone},
    {label:"Address", value:row.address},
  ];

  return(

    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto font-normal'>

      <CloseButton 
        title="Branch Details"
        onCancelClick={onClose} 
      />

      <div className="branch_container flex flex-col gap-5 mt-5 p-5">

        <div className="flex items-center gap-3 ">

          <div className="w-[109px] h-[109px] bg-[#E2E6E9] rounded-xl flex items-center justify-center">
            <BuildingStorefrontIcon className="w-15 h-15"/>
          </div>
        
          <div className="flex flex-col gap-1">
            {branchEnteries.map(({label, value})=>(
              <h4 key={label}>
                <span className="text-sec-text mr-1">{label}:</span> 
                {value || "--:--"}
              </h4>
            ))}
          </div>

        </div>

        <BranchDetailsMetrics id={row.id}/>
        <BranchListCards id={row.id}/>
      
      </div>

      <div className="flex gap-5 p-5">
        <button className="btn btn-outlined flex-1/2">Edit Details</button>
        <button className={`btn btn-filled ${row.is_active ? "bg-red-600 text-white" : "" } flex-1/2`}>
          {row.is_active? "Deactivate":"Activate"} Branch
        </button>
      </div>

    </div>
  )
}