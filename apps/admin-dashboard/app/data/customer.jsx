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


}