export default function TimelineContainer({data}) {

  const stages = [
    { label: 'Order Placed', description: 'Waiting to confirm order', timestamp: data.placed_at},
    { label: 'Order Accepted', description: `Accepted by ${data.accepted_by.first_name ||"a waiter"}`, timestamp: data.accepted_at},
    { label: 'Processing Order', description: `Cooking in progress by ${data.processed_by.first_name ||"chef"}`, timestamp: data.processed_at },
    { label: 'Order Completed', description: 'Order is ready', timestamp: data.served_at},
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