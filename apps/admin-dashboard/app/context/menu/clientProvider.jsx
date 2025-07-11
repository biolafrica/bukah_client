'use client'

import { createContext, useContext, useState, useEffect } from 'react'


const MenuContext = createContext()

export function useMenu() {
  return useContext(MenuContext)
}

export default function ClientMenuProvider({ branchOptions, categoryOptions, children }) {

  // UI state:
  const [segment,    setSegment]    = useState('items')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters,    setFilters]    = useState({ branch: '', category: '' })
  const [sortConfig, setSortConfig] = useState(null)

  // table data loaded from backend on every change:
  const [tableData, setTableData]   = useState([])
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState(null)

  // whenever segment/search/filters/sort change, re-fetch rows
  useEffect(() => {
    async function loadRows() {
      setLoading(true)
      const params = new URLSearchParams({
        ...(searchTerm && { searchTerm }),
        ...(segment === 'items' && filters.branch   && { branchId:   filters.branch }),
        ...(segment === 'items' && filters.category && { categoryId: filters.category }),
        ...(sortConfig && { sortBy: sortConfig.key, direction: sortConfig.direction }),
      })
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${ segment === 'items' ? 'products' : 'product-categories' }?${params}`

      try {
        const res = await fetch(url)
        const payload = await res.json()
        setTableData(payload.data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadRows()
  }, [segment, searchTerm, filters, sortConfig])

  // expose everything via context
  const value = {
    segment,
    setSegment,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    tableData,
    loading,
    error,
    branchOptions,
    categoryOptions,
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}
