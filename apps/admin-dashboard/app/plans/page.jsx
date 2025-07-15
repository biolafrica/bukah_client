"use client"
import { useState } from "react";
import BackButton from "../components/common/backButton";
import PlanList from "../components/pages/settings/planList";

export default function Plans(){
  const [monthPlan, setMonthPlan] = useState(true)
  return(
    <div className="p-5 lg:p-10"> 
      <BackButton info="Subscription Plans"/>

      <div className="flex flex-col items-center justify-center gap-5 mb-5">

        <div className="segmented">
          <button onClick={()=>setMonthPlan(true)} className={`segmented__option ${monthPlan ? "segmented__option--selected" : "segmented__option--unselected"}`}>
            Monthly
          </button>

          <button onClick={()=>setMonthPlan(false)} className={`segmented__option ${monthPlan ? "segmented__option--unselected" : "segmented__option--selected"}`}>Annually</button>
        </div>

        <h4 className="text-sec-text text-base font-light text-center lg:w-3/5">
          Discover our adaptable pricing options crafted specifically for restaurant management. Select the ideal package to effortlessly handle your eatery's details, from opening hours to customized settings.
        </h4>

      </div>

      {monthPlan ? (<PlanList year={false}/>) : (<PlanList year={true}/>)}
   
    </div>
  )
}