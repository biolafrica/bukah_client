import { formatNaira, formatNumber } from "../../../utils/format"
import { getInitials } from "../../../utils/initials"
import { useRecentEmployeeOrders } from "../../../hooks/useOrder"
import DataTable from "../../common/dataTable"
import { employee } from "../../../data/employee"
import EmptyState from "../../common/emptyState"

import { ClipboardIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"

export default function EmployeeDetailsCont({data}){

  const employeeEnteries =[
    {label:"Name", value:`${data.first_name} ${data.last_name}`},
    {label:"Role", value: data.role},
    {label:"Branch", value:data.branch.name},
    {label:"Email", value:data.email},
    {label:"Phone Number", value:data.phone_number},
  ]

  const employeeMetrics =[
    {label:"Total Amount Sold", value:formatNaira(data.total_sales || 0)},
    {label:"Total Orders", value:`${formatNumber(data.total_order|| 0)} orders`},
    {label:"Registered Date", value:format(new Date(data.created_at), 'dd-MM-yyyy')},
  ]

  const { items, isLoading, isError, error,} = useRecentEmployeeOrders(data.id)

  if (isLoading) return <p>Loading…</p>
  if (isError) return <p>Error: {error.message}</p>
  

  return(
    <div className="text-sm font-normal flex flex-col gap-5">
       
      <div className="employee_container mt-5">
        <h4 className="mb-2 font-medium">Employee Details</h4>

        <div className="flex items-center gap-3 ">
          <div className="flex flex-col items-center">
            <div className="w-[109px] h-[109px] bg-purple-200 text-4xl font-bold rounded-full flex items-center justify-center">
              {getInitials(data.first_name) + getInitials(data.last_name)}
            </div>
            <div className="text-green-600 bg-green-100 px-4 py-2 rounded-4xl w-fit mt-2">Active</div>
          </div>

          <div className="flex flex-col gap-1">
            {employeeEnteries.map(({label, value})=>(
              <h4 key={label}>
                <span className="text-sec-text mr-4">{label}:</span> 
                {value || "--:--"}
              </h4>
            ))}
          </div>
        </div>
      </div>

      <div className="metric_container border border-border-text rounded-md p-3 flex felx-1 ">
        {employeeMetrics.map(({label,value},i)=>(
          <div className={`px-5 ${i===2 ? "": "border-r border-border-text"} flex-1`} key={label}>
            <h4 className="text-xs text-sec-text mb-3">{label}</h4>
            <h4 className="text-xl">{value}</h4>
          </div>

        ))}
      </div>

      <div className="employee_container mt-5">
        <h4 className="mb-2 font-medium">Recent Sessions</h4>

        {items.length === 0 ? (
          <EmptyState
            icon={ClipboardIcon}
            title='No Recent Order'
            description="No recent order completed by the user"
          />
        ):(
          <DataTable
          columns={employee.orderColumn}
          data={items}
          edit={false}
          deleteIcon={false}
          onMore={()=>console.log("more")}
        />
        )}
      

      </div>

    
    </div>
  )
}