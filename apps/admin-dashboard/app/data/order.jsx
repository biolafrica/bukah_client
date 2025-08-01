import { format } from "date-fns"
import { useBranchOptions } from "../hooks/useBranchOptions"
import { formatNaira,} from "../utils/format"



export const order = {
  columns :[
    { key: 'order_code', header: 'Order ID', minWidth: '150px' },
    { key: "order_channel", header: "Channel", minWidth: "120px",},
    { key: 'branch', header: 'Branch', minWidth: '150px',render: row => row.branch?.name ?? '-' },
    { key: 'staff', header: 'Staff', minWidth: '150px',render: row => row.accepted?.first_name ?? '-' },
    { key: 'amount', header: 'Amount', minWidth: '150px',render: (row) => formatNaira(row.total_amount)},
    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px',render: row => format(new Date(row.placed_at),'dd-MM-yyyy')},
    { key: 'status', header: 'Status', minWidth: '100px',
      render: row => {
        const colors = {
          completed: 'bg-green-100 text-green-800',
          cancelled: 'bg-red-100 text-red-800',
          preparing: 'bg-yellow-100 text-yellow-800',
          pending: 'bg-blue-100 text-blue-800',
        }
        const cls = colors[row.status] || 'bg-gray-100 text-gray-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
            {row.status}
          </span>
        )
      }
    },
  ],

  segment: [
    { key: 'all', label: 'All' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ],

  statusOption:[ 
    { value: 'pending', label : "pending"},
    { value: 'preparing', label : "preparing"},
    { value: 'completed', label : "completed"},
    { value: 'cancelled', label : "cancelled"}
  ],

  channelOption:[
    {value: "online", label : "online"},
    {value: "instore", label : "instore"}
  ],

  sortOptions : [
    { key: "price", label: "Price" },
  ],

  filterConfig(){
    const {
      data: branchOptions,
      isLoading,
      isError,
      error,
    } = useBranchOptions()

    if (isLoading) return <p>Loading branches…</p>
    if (isError)   return <p>Error: {error.message}</p>
    
    return [
      { key:'branch',label:'Branch',type:'select',options: branchOptions},
      { key:'channel',label:'channel', type:'select', options:this.channelOption},
      { key:'dateRange',label:'Date Created',type:  'date-range' },

    ]

  },

}

