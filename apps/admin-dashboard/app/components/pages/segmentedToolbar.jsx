"use client"

import { useState } from "react"
import * as outline from "@heroicons/react/24/outline"

export default function SegmentedToolbar({
  segments,
  defaultActive,
  onSegmentChange,
  onSearch,
  onFilter,
  onSort,
  searchPlaceholder = 'Search',
}){

  const [active, setActive] = useState(
    defaultActive || (segments.length > 0 ? segments[0].key : '')
  )

  const handleSegmentClick = (key) => {
    setActive(key)
    onSegmentChange?.(key)
  }

  return(

    <div className="flex items-center justify-between my-6 gap-4">
      {/* Segmented control */}

      <div className="overflow-x-auto rounded-[6px]">
        <div className="segmented min-w-[150px]">
          {segments && segments.map(({ key, label }) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              className={`segmented__option ${
                active === key
                  ? 'segmented__option--selected'
                  : 'segmented__option--unselected'
              }`}
              onClick={() => handleSegmentClick(key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSegmentClick(key)
                }
              }}
            >
              <h4 className="text-sm">{label}</h4>
            </div>
          ))}
        </div>
      </div>


      {/* Actions: desktop */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center border border-gray-300 rounded-md bg-white">
          <outline.MagnifyingGlassIcon className="w-7 h-9 px-1" aria-hidden="true" />
          <input
            type="text"
            className="hidden lg:block input-search border-none h-9"
            placeholder={searchPlaceholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch?.(e.target.value)
            }}
            aria-label="Search"
          />
        </div>

        <button
          type="button"
          onClick={() => onFilter?.()}
          className="btn btn-tonal hidden lg:flex"
        >
          <outline.AdjustmentsVerticalIcon
            className="w-5 h-5"
            aria-hidden="true"
          />
          <span className="hidden lg:block text-sm">Filter</span>
        </button>

        <button
          type="button"
          onClick={() => onSort?.()}
          className="btn btn-tonal hidden lg:flex"
        >
          <outline.ArrowsUpDownIcon className="w-5 h-5" aria-hidden="true" />
          <span className="hidden lg:block text-sm">Sort</span>
        </button>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => onSearch?.()}
            className="btn btn-outlined p-2"
            aria-label="Search"
          >
            <outline.MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onFilter?.()}
            className="btn btn-outlined p-2"
            aria-label="Filter"
          >
            <outline.AdjustmentsVerticalIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onSort?.()}
            className="btn btn-outlined p-2"
            aria-label="Sort"
          >
            <outline.ArrowsUpDownIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    
  )
}