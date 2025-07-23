import { format } from "date-fns"
import { formatNaira, formatNumber } from "../utils/format"

export const employee ={

  filterConfig(branchOptions){
    return[
      { key:'branch', label: 'Branch', type: 'select', options: branchOptions },
      { key: 'isActive', label:'Status', type:   'select',
        options: [
          { value: 'true',  label: 'Active'   },
          { value: 'false', label: 'Inactive' },
        ]
      },
      { key:'role', label:'Role', type:'select',
        options: [
          { value: '',          label: 'All Roles' },
          { value: 'admin',     label: 'Admin'     },
          { value: 'manager',   label: 'Manager'   },
          { value: 'waiter',    label: 'Waiter'    },
          { value: 'chef',      label: 'Chef'      },
          { value: 'bartender', label: 'Bartender' },
          { value: 'supervisor',label: 'Supervisor'},
        ]
      },
    ]
  },

  sortOptions :[
    { key: 'name', label: 'Name' },
  ],

  columns:[
    { key: 'name', header: 'Name', minWidth: '150px', render: row => `${row.first_name} ${row.last_name}`},
    { key: 'role', header: 'Role', minWidth: '150px' },
    { key: 'email', header: 'Email',minWidth: '200px' },
    { key: 'branch', header: 'Branch', minWidth: '150px', render: row => row.branch?.name ?? '-' },
    { key: 'created_at', header: 'Date Registered', minWidth: '150px', render: row => new Date(row.created_at).toLocaleDateString('en-GB')},
    { key: 'isActive', header: 'Status', minWidth: '100px',
      render: row => {
        const cls = row.is_active
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {row.is_active ? 'Active' : 'Inactive'}
          </span>
        )
      }
    }
  ],

  segment: [
    { key: 'employees',   label: 'Employees'   },
    { key: 'permissions', label: 'Permissions' }
  ],

  addField(branchOptions){
    return [
      { name: 'firstName', label: 'First Name', placeholder:"Enter first name", type: 'text', required: true },

      { name: 'lastName', label: 'Last Name',  placeholder:"Enter last name", type: 'text', required: true },

      { name: 'email', label: 'Email Address', type: 'email', placeholder:"Enter email address", required: true },

      { name: 'phoneNumber', label: 'Phone Number', type: 'text',  placeholder:"Enter phone number", required: true },

      { name: 'role', label: 'Role', type: 'select',
        options: [
          { value: '', label: 'Choose role' },
          { value: 'supervisor',  label: 'supervisor' },
          { value: 'manager', label: 'Manager' },
          { value: 'waiter', label: 'Waiter' },
          { value: 'chef', label: 'Chef' },
          { value: 'bartender', label: 'Bartender' },
        ],
        required: true 
      },
      { name: 'branchId', label: 'Branch', type: 'select',
        options: [
          { value: '', label: 'Choose branch' },
          ...branchOptions.map(branch => ({
            value: branch.value,
            label: branch.label
          }))
          
        ],
        required: true 
      },
    ]
  },

  permissionGroup:[
    {
      title: 'Menu',
      state: {
        Owner: 'checked',
        Manager: 'indeterminate',
        Supervisor: 'indeterminate',
        Waiter: 'unchecked',
        Bartender: 'unchecked',
        Chef: 'unchecked',
      },
      children: [
        {
          title: 'Add items to the menu',
          state: {
            Owner: 'checked',
            Manager: 'checked',
            Supervisor: 'unchecked',
            Waiter: 'unchecked',
            Bartender: 'unchecked',
            Chef: 'unchecked',
          },
        },
        {
          title: 'Add categories to the menu',
          state: {
            Owner: 'checked',
            Manager: 'checked',
            Supervisor: 'unchecked',
            Waiter: 'unchecked',
            Bartender: 'unchecked',
            Chef: 'unchecked',
          },
        },
        {
          title: 'Edit and delete items',
          state: {
            Owner: 'checked',
            Manager: 'checked',
            Supervisor: 'unchecked',
            Waiter: 'unchecked',
            Bartender: 'unchecked',
            Chef: 'unchecked',
          },
        },
        {
          title: 'Generate menu bar-code',
          state: {
            Owner: 'checked',
            Manager: 'checked',
            Supervisor: 'unchecked',
            Waiter: 'unchecked',
            Bartender: 'unchecked',
            Chef: 'unchecked',
          },
        },
        
      ],
    },
    {
      title: 'Orders',
      state: {
        Owner: 'checked',
        Manager: 'indeterminate',
        Supervisor: 'indeterminate',
        Waiter: 'unchecked',
        Bartender: 'unchecked',
        Chef: 'unchecked',
      },
      children: [
        {
          title: 'Add items to the order',
          state: {
            Owner: 'checked',
            Manager: 'checked',
            Supervisor: 'unchecked',
            Waiter: 'unchecked',
            Bartender: 'unchecked',
            Chef: 'unchecked',
          },
        },

      ],
    },
  ],

  roles:[
    'Owner',
    'Manager',
    'Supervisor',
    'Waiter',
    'Bartender',
    'Chef',
  ],

  sessionColumn:[
    { key: 'date', header: 'Date', minWidth: '150px', render: row => format(new Date(row.created_at),'dd-MM-yyyy')},
    { key: 'clockIn', header: 'Clock-in', minWidth: '150px', render: row =>format(new Date(row.clock_in_time),'hh:mm a')},
    { key: 'clockOut', header: 'Clock-out', minWidth: '150px', render: row =>format(new Date(row.clock_out_time),'hh:mm a')},
    { key: 'totalOrder', header: 'Total order', minWidth: '150px',render: (row) => formatNumber(row.total_orders)},
    { key: 'totalAmount', header: 'Amount Earned', minWidth: '150px',render: (row) => formatNumber(row.total_earned)},
  ],

  orderColumn:[
    { key: 'order_code', header: 'Order ID', minWidth: '150px' },
    { key: "order_channel", header: "Channel", minWidth: "120px"},
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
  ]

}