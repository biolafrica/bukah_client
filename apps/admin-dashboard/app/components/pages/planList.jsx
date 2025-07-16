import * as outline from '@heroicons/react/24/outline'
import { formatNaira } from '../../utils/format'
import { planData } from "../../data/plan";


export default function PlanList({year}){
  return(
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {planData.map((plan)=>(
        <div key={plan.id} className={`border ${plan.popular ? "border-green-600" :"border-border-text"} rounded-2xl p-5 flex flex-col gap-4 h-[480px]`}>

          <h4 className="font-bold">
            {plan.name} 
            {plan.popular && (<span className="ml-2 py-1 px-4 bg-pri-cont rounded-md text-xs font-light" >Popular</span>)}
          </h4>

          <h4 className="text-sec-text">{plan.description}</h4>

          <h3 className="text-2xl font-medium">
            {year ? `${formatNaira(plan.price *0.8)}` :`${formatNaira(plan.price)}`} 
            <span className="text-base text-sec-text font-normal">/monthly</span>
          </h3>

          <button className="btn btn-filled">Contact Sales</button>

          <div className="flex flex-col gap-3">
            {plan.features.map((item)=>(
              <div key={item.id} className="flex items-center gap-2">
                <outline.CheckCircleIcon className="w-5 h-5 text-green-600"/>
                {item.feature}
              </div>
            ))}
          </div>
          
        </div>

      ))}

    </div>
  )
}