import Image from "next/image"
import { formatNaira } from "../../../utils/format"
import { format } from "date-fns"
import { useEffect, useState } from "react"

export default function DetailsContainer({data}){
  
  const [items, setItems] = useState([])
  const [loadingItems, setLoading] = useState(true)

  useEffect(() => {
    if (!data?.id) return
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order-items?orderId=${data.id}`)
        const json = await res.json()
        if (!cancelled) setItems(json.data.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [data?.id])

  const summaryEntries = [
    { label: 'Order ID',  value: data.order_code },
    { label: 'Status', value: data.status },
    { label: 'Date',   value: format(new Date(data.placed_at), 'dd-MM-yyyy') },
    { label: 'Time',   value: format(new Date(data.placed_at), 'hh:mm a') },
    { label: 'Branch', value: data.branch?.name ?? '-' },
    { label: 'Staff',   value: data.accepted_by?.first_name ?? '-' },
    { label: 'Order Channel',  value: data.order_channel },
    { label: 'Payment Method', value: data.payment_method },
  ]

  const cust = data.customer || {}
  const customerEntries = [
    { label: 'Type', value: cust.is_registered ? 'Registered' : 'Guest' },
    { label: 'Name', value: cust.name ?? '-' },
    { label: 'Email',  value: cust.email ?? '-' },
    { label: 'Phone Number', value: cust.phone ?? '-' },
  ]

  const amountEntries = [
    { label: 'Sub-total', value:data.sub_total },
    { label: 'Service Fee', value:data.service_charge ?? 0},
    { label: 'Tax',  value:data.tax_amount ?? 0},
    { label: 'Total', value:data.total_amount},
  ]

  return(

    <div className="mt-5 text-sm">

      <div className="order_summary_container mb-6">
        <h4 className="font-medium mb-2">Order Summary</h4>
        <div className="p-5 border border-border-text rounded-md flex flex-col gap-3 w-full">

          {summaryEntries.map(({label, value})=>(
            <div className="flex items-center justify-between font-light tex-sm" key={label}>
              <h4 className=" text-sec-text">{label}:</h4>
              <h4>{value}</h4>
            </div>
          ))}

        </div>
      </div>

      <div className="customer_details_container mb-6">
        <h4 className="font-medium mb-2">Customer Details</h4>
        <div className="p-2 border border-border-text rounded-md w-full">
          {customerEntries.map(({label,value})=>(
            <div className="flex items-center justify-between font-light tex-sm mb-2" key={label}>
              <h4 className=" text-sec-text">{label}:</h4>
              <h4>{value}</h4>
            </div>
          ))}
        </div>
      </div>

      {data.notes &&(
        <div className="notes_details_container mb-6">
          <h4 className="font-medium mb-2">Customer Notes</h4>

          <div className="p-5 min-h-[132px] border border-border-text rounded-md w-full">
          <h4 className="text-sec-text">{data.notes}</h4>
          </div>
        </div>

      )}

      <div className="customer_details_container mb-6">
        <h4 className=" font-medium mb-2">Items(s) Ordered</h4>
        
        <div className="p-5 border border-border-text rounded-md w-full flex flex-col gap-5">

          {loadingItems
            ? <h4>Loading items…</h4>
            : items.map(item => (
                <div
                  className="flex items-center justify-between p-4 border border-border-text rounded-md"
                  key={item.id}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.product.image_url || '/images/food.png'}
                      width={70}
                      height={64}
                      alt={item.name || "food image"}
                      className="object-contain"
                    />
                    <span>
                      {item.product.name} <span className="text-sec-text">×{item.quantity}</span>
                    </span>
                  </div>

                  <span>{formatNaira(item.price / item.quantity)}</span>
                </div>
              ))
          }

          <div className=" flex flex-col gap-3 items-end text-sec-text font-medium">
            {amountEntries.map(({label, value})=>(
              <h4 className="flex items-center justify-between w-1/2" key={label}>
                <span>{label}:</span> 
                <span className=" text-pri-text">{formatNaira(value)}</span>
              </h4>
            ))}
          </div>

        </div>

      </div>

      <button className="btn btn-filled w-full">Print Receipt</button>

    </div>
  )
}