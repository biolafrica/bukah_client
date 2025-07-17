import Image from "next/image"
import { formatNaira, formatNumber } from "../../../utils/format"
import { order } from "../../../data/order"
import { format } from "date-fns"
import { getInitials } from "../../../utils/initials"

export default function DetailsContainer({data}){

  const customerEnteries =[
    {label:"Name", value:data.name},
    {label:"Type", value: data.is_registered ? 'Registered' : 'Guest' },
    {label:"Email", value:data.email},
    {label:"Phone Number", value:data.phone}
  ]

  const customerMetrics =[
    {label:"Total Spent", value:formatNaira(data.total_spent)},
    {label:"Total Orders", value:`${formatNumber(data.total_orders)} orders`},
    {label:"Registered Date", value:format(new Date(data.created_at), 'dd-MM-yyyy')},
  ]

  const orderedMeal =[
    {key: 1, label:"Special Fried Rice", category:"Main, Rice", src:"/images/food.png", order: 10},
    {key: 2, label:"Meaty Jollof Rice", category:"Main, Rice", src:"/images/food.png", order: 5},
    {key: 3, label:"Yam Porridge", category:"Main", src:"/images/food.png", order: 4},
    {key: 4, label:"Coca-Cola", category:"Drinks", src:"/images/food.png", order: 3},
    {key: 5, label:"Spagetti Stir Fry", category:"Main, Spaghetti", src:"/images/food.png", order: 2},

  ]

  return(
    <div className="text-sm flex flex-col gap-5">
    
      <div className="deatils_container mt-5">
        <h4 className="mb-2 font-medium">Customer Details</h4>

        <div className="flex items-center gap-3 ">
          <div className="w-[109px] h-[109px] bg-purple-200 text-4xl font-bold rounded-full flex items-center justify-center">
            {getInitials(data.name)}
          </div>

          <div className="flex flex-col gap-1">
            {customerEnteries.map(({label, value})=>(
              <h4 key={label}>
                <span className="text-sec-text mr-4">{label}:</span> 
                {value || "--:--"}
              </h4>
            ))}
          </div>
        </div>
      </div>

      <div className="metric_container border border-border-text rounded-md p-3 flex felx-1 ">
        {customerMetrics.map(({label,value},i)=>(
          <div className={`px-5 ${i===2 ? "": "border-r border-border-text"} flex-1`} key={label}>
            <h4 className="text-xs text-sec-text mb-3">{label}</h4>
            <h4 className="text-xl">{value}</h4>
          </div>

        ))}
      </div>

      <div className="most_ordered_meal_cont ">
        <h4 className="mb-2 font-medium">Most Ordered Meals</h4>

        <div className="border border-border-text rounded-md p-5 flex flex-col gap-5">
          {orderedMeal.map((o,i)=>(
            <div className="flex items-center justify-between" key={o.key}>
              <div className="flex items-center gap-2">
                <h4 className="text-sec-text">{++i}.</h4>
                <div className="w-[40px] h-40px rounded-full">
                  <Image src={o.src} width={40} height={40} alt={`${o.label}image`} />
                </div>
                <div>
                  <h4>{o.label}</h4>
                  <h4 className="text-sec-text">{o.category}</h4>
                </div>
              </div>

              <h4 className="text-sec-text">
                {o.order} orders
              </h4>
            </div>

          ))}
        </div>

      </div>

    </div>
  )
}