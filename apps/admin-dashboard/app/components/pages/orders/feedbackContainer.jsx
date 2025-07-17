import { format } from "date-fns"
import { useEffect, useState } from "react"

export default function FeedbackContainer({id}){

  const starLabels = [
    'Not Rated',
    'Very Poor Experience',
    'Poor Experience',
    'Average Experience',
    'Good Experience',
    'Excellent Experience'
  ]

  const [items, setItems] = useState([])
  const [loadingItems, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/feedback`)
        const json = await res.json()
        if (!cancelled) setItems(json.order.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  return(
    <div className="mt-5">

      <div className="flex flex-col gap-5">
        {loadingItems ? (<h4>Loading feedbacks…</h4>)
          : items.length === 0 ?(<h4 className="text-center text-base mt-5">No feedback for this Order</h4>)
          :( items.map(item => (
              <div className="tex-sm border flex items-start gap-4 border-border-text rounded-xl p-5" key={item.id}>

                <img src={`/icons/${item.rating}-star.svg`} alt="rating icons" />

                <div className="flex flex-col gap-2">
                  <h4 className="font-medium">{starLabels[item.rating]}</h4>
                  <h4 className="font-light text-sec-text">{item.comment}</h4>
                  <h4 className="font-medium text-[#63637A]">
                  <span>{format(new Date(item.created_at),'dd-MM-yyyy')}</span> |
                  <span> {format(new Date(item.created_at), 'hh:mm a')}</span>
                  </h4>
                </div>
              </div>
          
            )))
        }

      </div>
      
     
    </div>
  )
}