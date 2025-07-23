import { useState } from "react"
import EmployeeDetailsCont from "./employeeDetailsCont"
import EmployeeOrderHistory from "./employeeOrderHistory"
import EmployeeAttendanceHistory from "./employeeAttendanceHistory"
import CloseButton from "../../common/closeButton"

export default function MoreEmployee({onClose, row}){
   const [segment, setSegment] = useState("details")
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>
      <CloseButton  
        title='Employee Details'
        onCancelClick={onClose}
      />
      <div className="p-5">

        <div className="segmented w-full">
          <div 
            className={`segmented__option ${segment === "details" ? "segmented__option--selected": "segmented__option--unselected" } flex-1`}
            onClick={()=>setSegment('details')}
          >
            Details
          </div>

          <div 
            className={`segmented__option flex-1 ${segment === "orderHistory" ? "segmented__option--selected": "segmented__option--unselected" }`}
            onClick={()=>setSegment('orderHistory')}
          >
            Order History
          </div>

          <div 
            className={`segmented__option flex-1 ${segment === "attendanceHistory" ? "segmented__option--selected": "segmented__option--unselected" }`} 
            onClick={()=>setSegment('attendanceHistory')}
          >
            Attendance History
          </div>

        </div>

          {segment === "details" ? 

            (
              <EmployeeDetailsCont data={row} />
            ) : segment === "orderHistory" ? 

            (
              <EmployeeOrderHistory/> ):
            (
              <EmployeeAttendanceHistory/>
            )
          }


        
      </div>
      
    </div>
  )
}