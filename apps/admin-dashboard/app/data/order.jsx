import { date } from "zod"
import { formatNaira, formatNumber } from "../utils/format"

export const order = {
  columns :[
    { key: 'order_code', header: 'Order ID', minWidth: '150px' },

    { key: "order_channel", header: "Channel", minWidth: "120px",},

    { key: 'branch', header: 'Branch', minWidth: '150px',render: row => row.branch?.name ?? '-' },

    { key: 'staff', header: 'Staff', minWidth: '150px',render: row => row.accepted_by?.first_name ?? '-' },

    { key: 'amount', header: 'Amount', minWidth: '150px',render: (row) => formatNaira(row.total_amount),},

    { key: 'dateAndTime', header: 'Date and Time', minWidth: '150px',render: (row) => new Date(row.placed_at).toLocaleString() },

    {
      key: 'status',
      header: 'Status',
      minWidth: '100px',
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

  data :[
    {
      id: 1,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "cancelled"
    },
    {
      id: 2,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "inprogress"
    },
    {
      id: 3,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "received"
    },
    {
      id: 4,
      orderID: '#001',
      items: 'Rice,Beans,Beef',
      branch: 'Branch A',
      staff: 'Adekunle Johnson',
      amount: formatNaira(60000),
      dateAndTime: '26-05-2025 - 03:00pm',
      status: "completed"
    },

  ],

  metrics :[
    { label: 'Total Orders', value: formatNumber(2500), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
    { label: 'Completed', value: formatNumber(2400), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
    { label: 'In Progress', value: formatNumber(90), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
    { label: 'Cancelled', value: formatNumber(19), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
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
    { key: "orderNumber", label: "Order Number" },
    { key: "price", label: "Price" },
  ],

  dateOptions: [
    {}
  ]
}