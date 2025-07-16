import Image from "next/image"
import { formatNaira, formatNumber } from "../../../utils/format"
import { order } from "../../../data/order"

export default function DetailsContainer(){

  const customerDetails =[
    {key: 1, label:"Name", value:"John Dumebi"},
    {key: 2, label:"Type", value:"Registered Customer"},
    {key: 3, label:"Email", value:null},
    {key: 4, label:"Phone Number", value:"08035836465"}
  ]

  const customerMetrics =[
    {key: 1, label:"Total Spent", value:formatNaira(150000)},
    {key: 2, label:"Total Orders", value:`${formatNumber(20)} orders`},
    {key: 3, label:"Registered Date", value:"12-01-2024"},
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
            JD
          </div>

          <div className="flex flex-col gap-1">
            {customerDetails.map((i)=>(
              <h4 key={i.key}>
                <span className="text-sec-text mr-4">{i.label}:</span> 
                {i.value || "--:--"}
              </h4>
            ))}
          </div>
        </div>
      </div>

      <div className="metric_container border border-border-text rounded-md p-3 flex felx-1 ">
        {customerMetrics.map((c,i)=>(
          <div className={`px-5 ${i===2 ? "": "border-r border-border-text"} flex-1`} key={c.key}>
            <h4 className="text-xs text-sec-text mb-3">{c.label}</h4>
            <h4 className="text-xl">{c.value}</h4>
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