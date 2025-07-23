import { ArrowUpTrayIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useEmployeeOrders } from "../../../hooks/useOrder";
import DataTable from "../../common/dataTable";
import EmptyState from "../../common/emptyState";
import { employee } from "../../../data/employee";

export default function EmployeeOrderHistory({id}){
  const { items, isLoading, isError, error,} = useEmployeeOrders(id)

  if (isLoading) return <p>Loading…</p>
  if (isError) return <p>Error: {error.message}</p>

  return(
    <div className="text-sm flex flex-col gap-5">

      <div className="flex items-center justify-between mt-5">
        <h4 className="font-medium text-base">Order History</h4>
        <button className="btn btn-filled">
          <ArrowUpTrayIcon className="w-4 h-4"/>
          Export
        </button>
      </div>

      <div>

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