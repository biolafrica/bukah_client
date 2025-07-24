import { useMemo, useState } from "react";
import { formatNaira, formatNumber } from "../utils/format";

export const customer ={

  columns:[
    { key: 'name',header: 'Name',minWidth: '200px' },
    { key: 'total_orders', header: 'Total Orders', minWidth: '150px' },
    {key:'total_spent', header:'Total Spent', minWidth:'150px',
      render: (row) => formatNaira(row.total_spent)
    },
    {key:'created_at', header:'Date Registered', minWidth: '150px',
      render:(row) => new Date(row.created_at).toLocaleDateString('en-GB')
    },
  ],

  segments:[
    { key: 'all',        label: 'All' },
    { key: 'registered', label: 'Registered' },
    { key: 'guest',      label: 'Guest' },
  ],

  sortOptions:[
    { key: 'totalSpent', label: 'Total Spent'  }
  ],

  filterConfig(){
    return [{
      key:   'dateRange',
      label: 'Date Registered',
      type:  'date-range',
    }]
  },

  useCustomerMetrics(rawData){
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
          value: formatNumber(current),
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
  },


}