import React, { useEffect , useState, useRef} from 'react'
import * as outline from '@heroicons/react/24/outline'

export default function SortDropdown({
  options,
  sortConfig,
  onSort,
  onClear,
  label = 'Sort',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block z-45" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
          sortConfig
            ? 'bg-pri-cont border-pri-cont text-on-pri'
            : 'bg-[#E8E8E8] border-border-text text-pri-text hover:bg-gray-50'
        }`}
      >
        <outline.ArrowsUpDownIcon className="w-4 h-4 transform" aria-hidden="true" />
        <span className='text-sm'>{label}</span>
        {sortConfig && (
          <div className="flex items-center gap-1">
            {sortConfig.direction === 'asc' ? (
              <outline.ArrowUpIcon className="w-3 h-3 text-on-pri-cont" aria-hidden="true" />
            ) : (
              <outline.ArrowDownIcon className="w-3 h-3 text-on-pri-cont" aria-hidden="true" />
            )}
          </div>
        )}
        <outline.ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Sort Options</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <outline.XMarkIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              {options.map(opt => {
                const isActive = sortConfig?.key === opt.key
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onSort(opt.key)
                      setOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors cursor-pointer ${
                      isActive ? 'bg-pri text-on-pri-cont' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isActive && (
                      sortConfig.direction === 'asc' ? (
                        <outline.ArrowUpIcon className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        <outline.ArrowDownIcon className="w-3 h-3" aria-hidden="true" />
                      )
                    )}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border-text">
              <button
                type="button"
                onClick={() => {
                  onClear()
                  setOpen(false)
                }}
                className="flex-1 btn btn-inactive transition-colors"
              >
                Clear Sort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


