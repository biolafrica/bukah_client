export default function ListingCard({ title, items, loading = false }) {

  const colors = [
    'bg-green-300',
    'bg-blue-300',
    'bg-purple-300',
    'bg-red-300',
    'bg-yellow-300',
  ]


  const getInitials = (name) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    const initials = parts.map(p => p.charAt(0).toUpperCase()).join('')
    return initials.slice(0, 2)
  }



  return (
    <div className="text-pri-text p-[16px] border border-border-text rounded-md bg-white mb-5 min-w-[100px]">

      <h4 className="mb-5 text-sec-text text-sm">{title}</h4>

      <ol className="flex flex-col gap-5">

        {(loading ? Array(5).fill({}) : items).map((item, idx) => {

          if (loading) {
            return (
              <li key={idx} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-6 h-4 bg-gray-200 rounded" />
                  <div className="rounded-full w-[40px] h-[40px] bg-gray-300" />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </li>
            )
          }

          else{
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
          }

        })}

      </ol>

     

    </div>
  )
}