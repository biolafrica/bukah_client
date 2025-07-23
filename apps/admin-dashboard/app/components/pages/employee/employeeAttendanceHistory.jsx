import { ArrowUpTrayIcon, ClockIcon } from "@heroicons/react/24/outline"
import { employee } from "../../../data/employee"
import { useEmployeeSessions } from "../../../hooks/useEmployee"
import DataTable from "../../common/dataTable"
import EmptyState from "../../common/emptyState"

export default function EmployeeAttendanceHistory({id}){

  const { items, isLoading, isError, error} = useEmployeeSessions(id)


  if (isLoading) return <p>Loading…</p>
  if (isError) return <p>Error: {error.message}</p>

  return(
    <div className="text-sm flex flex-col gap-5">

      <div className="flex items-center justify-between mt-5">
        <h4 className="font-medium text-base">User Sessions</h4>
        <button className="btn btn-filled">
          <ArrowUpTrayIcon className="w-4 h-4"/>
          Export
        </button>
      </div>

      <div>
        {items.length === 0 ? (
          <EmptyState
            icon={ClockIcon}
            title='No Session Yet'
            description="The user sessions will appear here"
          />
        ):(
          <DataTable
            columns={employee.sessionColumn}
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