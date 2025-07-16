export default function ListingCard({ title, items }) {
  // background color classes for initials, cycle through for each index
  const colors = [
    'bg-green-300',
    'bg-blue-300',
    'bg-purple-300',
    'bg-red-300',
    'bg-yellow-300',
  ]

  // helper to get initials
  const getInitials = (name) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    const initials = parts.map(p => p.charAt(0).toUpperCase()).join('')
    return initials.slice(0, 2)
  }

  return (
    <div className="text-pri-text p-[16px] border border-border-text rounded-md bg-white mb-5 min-w-[300px]">
      <h4 className="mb-5 text-sec-text text-sm">{title}</h4>

      <ol className="flex flex-col gap-5">
        {items.map((item, idx) => {
          const colorClass = colors[idx % colors.length]
          const initials = getInitials(item.name)

          return (
            <li key={item.id} className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                {/* Manual numbering */}
                <span className="flex-shrink-0 w-6 text-right font-normal text-sec-text">
                  {idx + 1}.
                </span>

                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />

                ) : (

                  <div
                    className={`rounded-full w-[40px] h-[40px] flex items-center justify-center ${colorClass}`}
                  >
                    <span className="text-base font-semibold">{initials}</span>
                  </div>
                )}

                <div className="text-sm flex flex-col gap-1">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  {item.role && (
                    <span className="text-sec-text text-xs">{item.role}</span>
                  )}
                </div>
              </div>

              {item.countText && (
                <div>
                  <span className="text-sec-text text-xs">{item.countText}</span>
                </div>
              )}

            </li>
          )
        })}

      </ol>
    </div>
  )
}