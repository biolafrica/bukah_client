import * as outline from '@heroicons/react/24/outline'
import { useEffect, useState , useRef} from 'react'

function MetricItem({ label, value, percentage, comparison, trend, loading }) {
  const Icon = trend === 'down'
    ? outline.ArrowTrendingDownIcon
    : outline.ArrowTrendingUpIcon
  const colorClass = trend === 'down' ? 'text-red-600' : 'text-green-600'

  return (
    <div className="flex flex-col gap-3 min-w-[200px]">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-2xl font-semibold text-gray-900">{value }</span>
      <div className={`flex items-center gap-2 ${colorClass}`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
        <span className="font-semibold">{percentage}</span>
        <span className="text-sm text-sec-text">{comparison}</span>
      </div>
    </div>
  )
}

export default function MetricsContainer({
  metrics,
  range = 'Today',
  onRangeChange = () => {},
  ranges = ['Today', 'Last 7 Days', 'Last 30 Days'],
  loading = false
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    const handleOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  if(loading){
    return (
      <div className="flex flex-col gap-3 min-w-[200px] animate-pulse border border-border-text rounded-md">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-border-text rounded-md p-3 my-5 flex items-center gap-5">
      {/* Range selector */}

      <div ref={ref} className="relative inline-block mb-3">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <outline.CalendarIcon className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-800">{range}</span>
          <outline.ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <ul className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
            {ranges.map(r => (
              <li
                key={r}
                onClick={() => { onRangeChange(r); setOpen(false) }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Metrics row */}
      <div className="flex flex-1 items-center gap-4 overflow-x-auto">
        {metrics.map((m, idx) => (
          <div
            key={m.label}
            className={idx < metrics.length - 1 ? 'border-r border-gray-300 pr-5 flex-1' : 'flex-1'}
          >
            <MetricItem {...m} />
          </div>
        ))}
      </div>
    </div>
  )
}