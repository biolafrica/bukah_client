import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AISuggestionContainer(){
  return(
    <div className="ai_suggestion_container mt-5">

      <div className="flex gap-2 border border-border-text rounded-md p-5">
        <UserCircleIcon className="min-w-9 h-6"/>
        <div>
          <h4 className="text-sec-text mb-1">
            Based on this customer recent orders, we suggest trying the Jollof Rice with Grilled Chicken next time. It's a beloved classic and pairs perfectly with our Fried Plantains. For a lighter option, consider the Nigerian Vegetable Salad with a zesty dressing!
          </h4>
          <h4 className="font-bold">View Report</h4>
        </div>
      </div>

    </div>
  )
}