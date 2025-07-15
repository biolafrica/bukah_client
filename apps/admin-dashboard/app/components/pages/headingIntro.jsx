import * as outline from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"


export default function HeadingIntro({
  module,
  moduleIntro,
  Icon,
  buttonText,
  branches = false,
  branchOptions = [],         // [{ value, label }]
  onBranchSelect = () => {},
  onButtonClick = () => {},
  finalOptions = null         // [{ label, onClick }]
}) {
  const [branchOpen, setBranchOpen] = useState(false)
  const [finalOpen, setFinalOpen] = useState(false)
  const branchRef = useRef(null)
  const finalRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (branchRef.current && !branchRef.current.contains(e.target)) {
        setBranchOpen(false)
      }
      if (finalRef.current && !finalRef.current.contains(e.target)) {
        setFinalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl text-gray-800 mb-2">{module}</h1>

            {branches && (
              <div ref={branchRef} className="relative inline-block">

                <button
                  type="button"
                  onClick={() => setBranchOpen(o => !o)}
                  className="btn btn-tonal flex items-center gap-1"
                >
                  <span>All Branches</span>
                  <outline.ChevronDownIcon className="w-5 h-5" />
                </button>

                {branchOpen && (
                  <ul className="absolute mt-1 w-48 bg-white border border-gray-200 rounded shadow">
                    {branchOptions.map(opt => (
                      <li
                        key={opt.value}
                        onClick={() => { onBranchSelect(opt.value); setBranchOpen(false) }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            )}

          </div>
          <h4 className="hidden lg:block text-sm text-gray-400 font-light">{moduleIntro}</h4>
        </div>

        <div>
          <div ref={finalRef} className="relative inline-block">
            {Array.isArray(finalOptions) && finalOptions.length > 0 ? (

              <>
                <button
                  type="button"
                  onClick={() => setFinalOpen(o => !o)}
                  className="btn btn-filled flex items-center gap-1"
                >
                  <Icon className="w-5 h-5 font-bold" />
                  <span>{buttonText}</span>
                  <outline.ChevronDownIcon className="w-5 h-5" />
                </button>

                {finalOpen && (
                  <ul className="absolute mt-1 right-0 w-48 bg-white border border-gray-200 rounded shadow">
                    {finalOptions.map((opt, idx) => (
                      <li
                        key={`${opt.label}-${idx}`}
                        onClick={() => { opt.onClick(); setFinalOpen(false) }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {opt.icon && <opt.icon className="w-4 h-4" />}
                        <span>{opt.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

              </>

            ) : (
              <button
                type="button"
                onClick={onButtonClick}
                className="btn btn-filled flex items-center gap-1"
              >
                <Icon className="w-5 h-5 font-bold" />
                <span>{buttonText}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}