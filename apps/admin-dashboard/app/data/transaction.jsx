import { useMemo, useState } from "react"
import { formatNaira } from "../utils/format"
import { useBranchOptions } from "../hooks/useBranchOptions"

export const transaction = {
  segments:[
    { key: 'all',        label: 'All'       },
    { key: 'successful', label: 'Successful' },
    { key: 'pending',    label: 'Pending'    },
    { key: 'refund',     label: 'Refund'     },
  ],

  sortOptions : [
    { key: 'totalAmount', label: 'Total Amount' },
  ],

  colums :[
    { key: 'reference_id', header: 'Reference ID', minWidth: '150px' },
    { key: 'order.order_code', header: 'Order ID', minWidth: '150px', render: row => row.order?.order_code ?? '-' },
    { key: 'payment_method', header: 'Payment Method', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px', render: row => row.branch?.name ?? '-' },
    { key: 'total_amount', header: 'Amount', minWidth: '150px', render: row => formatNaira(row.total_amount) },
    { key: 'created_at', header: 'Date and Time', minWidth: '150px', render: row => new Date(row.created_at).toLocaleString('en-GB') },
    {
      key: 'transaction_type',
      header: 'Status',
      minWidth: '100px',
      render: row => {
        const colors = {
          successful: 'bg-green-100 text-green-800',
          pending:    'bg-yellow-100 text-yellow-800',
          refund:     'bg-blue-100 text-blue-800',
        }
        const cls = colors[row.transaction_type] || 'bg-gray-100 text-gray-800'
        return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{row.transaction_type}</span>
      }
    },
  ],

  filterConfig(branchOptions){
    return [
      {key:'dateRange',label:'Date Created', type:'date-range'},
      {key: 'branch', label:'Branch', type: 'select', options: branchOptions },
      {key: 'method',label: 'Method', type: 'select',
        options: [
          { value: 'cash',     label: 'Cash'     },
          { value: 'transfer', label: 'Transfer' },
          { value: 'card',     label: 'Card'     },
        ],
      },
    ]

  },

}






