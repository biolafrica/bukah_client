import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import DataTable from "../../common/dataTable";
import { formatNaira } from "../../../utils/format";

export default function OrderHistoryContainer(){
  const columns=[
    { key: 'order_code', header: 'Order ID', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px',render: row => row.branch?.name ?? '-' },
    { key: 'staff', header: 'Staff', minWidth: '150px',render: row => row.accepted_by?.first_name ?? '-' },
    { key: 'amount', header: 'Amount', minWidth: '150px',render: (row) => formatNaira(row.total_amount)},
    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px',render: row => new Date(row.placed_at).toLocaleString('en-GB') },
  ];

  const data =[
    {key: 1, order_code:"#789012", branch:{name:"Branch A"}, accepted_by:{first_name:'Olatunbosun'}, total_amount:4000, placed_at:"2025-06-19T18:24:43.525733+00:00"},
    {key: 2, order_code:"#789013", branch:{name:"Branch B"}, accepted_by:{first_name:'Olatunbosun'}, total_amount:5000, placed_at:"2025-06-19T18:24:43.525733+00:00"},
    {key: 3, order_code:"#789014", branch:{name:"Branch C"}, accepted_by:{first_name:'Adedeji'}, total_amount:400000, placed_at:"2025-06-19T18:24:43.525733+00:00"},
    {key: 4, order_code:"#789015", branch:{name:"Branch A"}, accepted_by:{first_name:'Adedeji'}, total_amount:2000, placed_at:"2025-06-19T18:24:43.525733+00:00"},
    {key: 5, order_code:"#789016", branch:{name:"Branch A"}, accepted_by:{first_name:'Jamiu'}, total_amount:500, placed_at:"2025-06-19T18:24:43.525733+00:00"}
  ];

  const page ="0"
  const pageIdx  = parseInt(page, 10) || 0
  const pageSize = 10
  const start    = pageIdx * pageSize
  const end      = start + pageSize - 1

  return(
    <div className="order_history_container mt-5">

      <div className="flex justify-end">
        <button className="btn btn-filled">
          <ArrowUpTrayIcon className="w-5 h-5"/>
          Export
        </button>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={data}
          edit={false}
          deleteIcon={false}
          exportIcon={true}
          chatIcon={true}
          onExport={() => console.log("export") }
          onMore={() => console.log("more")}
          onFeedbacks={()=>console.log("feedback")}
          currentPage={pageIdx}
          pageSize={pageSize}
          totalCount={10}
          onPageChange={() => console.log("page")}
        />
      </div>

    </div>
  )
}