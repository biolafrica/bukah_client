"use client"

import { useState } from "react"
import * as outline from "@heroicons/react/24/outline"
import FilterDropdown from "../uiComponents/filter"
import SortDropdown from "../uiComponents/sort"

export default function SegmentedToolbars({
  segments,
  defaultActive,
  onSegmentChange,
  onSearch,
  searchPlaceholder = "Search",
  // filterProps: { filters, config, onChange, onApply, onClear, title }
  filterProps = null,
  // sortProps: { options, sortConfig, onSort, onClear, label }
  sortProps = null,
  search = true
}) {
  const [active, setActive] = useState(
    defaultActive || (segments.length > 0 ? segments[0].key : "")
  )

  const handleSegmentClick = (key) => {
    setActive(key)
    onSegmentChange?.(key)
  }

  return (
    <div className="md:flex items-center justify-between my-6 gap-4">

      {/* Segmented control */}
      <div className="overflow-x-auto rounded-[6px] mb-2">
        <div className="segmented min-w-[150px]">
          {segments.map(({ key, label }) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              className={`segmented__option ${
                active === key
                  ? "segmented__option--selected"
                  : "segmented__option--unselected"
              }`}
              onClick={() => handleSegmentClick(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
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

      {/* Actions */}
      <div className="flex items-center gap-2 mb-2">

        {/* Search */}
        {search && (<div className="flex items-center border border-gray-300 rounded-md bg-white">
            <outline.MagnifyingGlassIcon
              className="w-7 h-9 px-1"
              aria-hidden="true"
            />
            <input
              type="text"
              className="input-search border-none h-9"
              placeholder={searchPlaceholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch?.(e.target.value)
              }}
              aria-label="Search"
            />
          </div>)
        }

        {/* Filter */}
        {filterProps && (
          <div >
            <FilterDropdown {...filterProps} />
          </div>
        )}

        {/* Sort */}
        {sortProps && (
          <div>
            <SortDropdown {...sortProps} />
          </div>
        )}
      </div>

    </div>
)}