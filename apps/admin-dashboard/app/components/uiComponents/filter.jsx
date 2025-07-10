import * as outline from '@heroicons/react/24/outline'
import { useEffect , useState, useRef} from 'react'

export default function FilterDropdown({
  filters,
  config,
  onChange,
  onApply,
  onClear,
  title = 'Filter Options',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeCount = Object.values(filters).filter(v => v !== '' && v != null).length

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          activeCount > 0
            ? 'bg-pri-cont border-pri-cont text-on-pri'
            : 'bg-[#E8E8E8] border-border-text text-pri-text hover:bg-gray-50'
        }`}
      >
        <outline.FunnelIcon className="w-4 h-4" aria-hidden="true" />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="bg-on-pri-cont text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
        <outline.ChevronDownIcon
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{title}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <outline.XMarkIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-4">
              {config.map(filter => {
                const { key, label, type, options, fromKey, toKey } = filter
                return (
                  <div key={key}>
                    
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>

                    {type === 'select' && (
                      <select
                        value={filters[key] || ''}
                        onChange={e => onChange(key, e.target.value)}
                        className="w-full px-3 py-2 border border-border-text rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C274C]"
                      >
                        <option value="">All</option>
                        {options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {type === 'text' && (
                      <input
                        type="text"
                        value={filters[key] || ''}
                        onChange={e => onChange(key, e.target.value)}
                        placeholder={filter.placeholder || ''}
                        className="w-full px-3 py-2 input"
                      />
                    )}

                    {type === 'date-range' && (
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={filters[fromKey] || ''}
                          onChange={e => onChange(fromKey, e.target.value)}
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                          type="date"
                          value={filters[toKey] || ''}
                          onChange={e => onChange(toKey, e.target.value)}
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            
            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  onClear()
                }}
                className="flex-1 btn btn-inactive transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => {
                  onApply()
                  setOpen(false)
                }}
                className="flex-1 btn btn-filled transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}