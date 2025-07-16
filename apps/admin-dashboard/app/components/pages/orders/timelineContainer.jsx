
export default function TimelineContainer() {

  const stages = [
    {
      label: 'Order Placed',
      description: 'Waiting to confirm order',
      timestamp: '2025-07-01T09:15:00Z'
    },
    {
      label: 'Order Accepted',
      description: 'Accepted by a waiter',
      timestamp: '2025-07-01T09:17:30Z'
    },
    {
      label: 'Preparing Order',
      description: 'Items are being prepared',
      timestamp: null 
    },
    {
      label: 'Processing Order',
      description: 'Cooking in progress'
    },
    {
      label: 'Order Completed',
      description: 'Order is ready',
      timestamp: null
    },
  ]

  return (
    <div className="flex flex-col mt-5 p-5">

      {stages.map((stage, idx) => {
        const completed = Boolean(stage.timestamp)
        const isLast    = idx === stages.length - 1

        return (
          <div key={idx} className="flex items-start gap-4 mb-3 text-sm">
            {/* Timeline indicator */}

            <div className="flex flex-col items-center">
              <img
                src={completed ? "/icons/radio-active.svg" : "/icons/radio-inactive.svg"}
                alt={completed ? "Completed" : "Pending"}
                className="w-4 h-4"
              />

              {/* Dotted line under icon, skip for last */}
              {!isLast && (
                <div className={`w-[1px] h-[55px] border border-dashed ${completed ? " border-success-600" : "border-border-text"} mt-1 `} />
              )}
            </div>

            {/* Content: label, description, and timestamp */}
            <div className="flex-1 flex justify-between items-start">
              <div>
                <p className="font-medium text-pri-text">{stage.label}</p>
                {stage.description && (
                  <p className="font-light text-sec-text">{stage.description}</p>
                )}
              </div>

              <span className={completed ? 'text-sec-text' : 'text-gray-400'}>
                {completed
                  ? new Date(stage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '--:--'}
              </span>
            </div>

          </div>
        )
      })}
    </div>
  )
}