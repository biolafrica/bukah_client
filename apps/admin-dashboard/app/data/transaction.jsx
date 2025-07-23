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

  filterConfig(dateRange){
    const {
      data: branchOptions,
      isLoading,
      isError,
      error,
    } = useBranchOptions();
    
    if (isLoading) return <p>Loading branches…</p>
    if (isError)   return <p>Error: {error.message}</p>

    const [drStart, drEnd] = (dateRange || '').split(',')
    return [
      {key:'dateRange',label:'Date Created', type:'date-range', value: { from: drStart, to: drEnd }},
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

  useFinanceMetrics(rawData){
    const [range, setRange] = useState('today')

    const metrics = useMemo(() => {
      if (!rawData) return []

      return Object.entries(rawData).map(([label, periods]) => {

        const window = periods?.[range] ?? { current: 0, previous: 0 }
        const { current, previous } = window
        const diff = current - previous
        const pct  = previous > 0 ? (diff / previous) * 100 : 0

        return {
          label,
          value:      formatNaira(current),
          percentage: `${diff >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
          comparison:
            range === 'today'  ? 'vs yesterday'
          : range === 'last7'  ? 'vs prior 7 days'
          :                      'vs prior 30 days',
          trend: diff >= 0 ? 'up' : 'down',
        }
      })
    }, [rawData, range])

    return { metrics, range, setRange }
  }

}






