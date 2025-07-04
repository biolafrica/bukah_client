import * as outline from '@heroicons/react/24/outline'

function MetricItem({ label, value, percentage, comparison, trend }) {
  const Icon = trend === 'down'
    ? outline.ArrowTrendingDownIcon
    : outline.ArrowTrendingUpIcon
  const colorClass = trend === 'down' ? 'text-red-600' : 'text-green-600'

  return (
    <div className="flex flex-col gap-3">
      <span className="text-gray-600 text-xs">{label}</span>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <div className={`flex items-center gap-2 ${colorClass}`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
        <span className="font-semibold">{percentage}</span>
        <span className="text-xs text-gray-500">{comparison}</span>
      </div>
    </div>
  )
}

export default function MetricsContainer({ metrics }) {
  return (
    <div className="ring-1 ring-inset ring-gray-300 rounded-sm flex items-center flex-1 p-5 my-5 gap-5">
      {metrics.map((metric, idx) => (
        <div
          key={metric.label}
          className={idx < metrics.length - 1 ? 'border-r border-gray-300 pr-5 w-1/3' : 'w-1/3'}
        >
          <MetricItem {...metric} />
        </div>
      ))}
    </div>
  )
}