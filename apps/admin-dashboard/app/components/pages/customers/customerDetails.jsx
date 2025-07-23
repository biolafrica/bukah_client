import { useState } from "react";
import CloseButton from "../../common/closeButton";
import AISuggestionContainer from "./aiSuggestionContainer";
import DetailsContainer from "./detailsContainer";
import OrderHistoryContainer from "./orderHistoryContainer";

export default function CustomerDetails({onClose, data}){
  const [segment, setSegment] = useState("details")
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton  
        title='Customer Details'
        onCancelClick={onClose}
      />

      <div className="p-5">

        <div className="segmented w-full">
          <div 
            className={`segmented__option ${segment === "details" ? "segmented__option--selected": "segmented__option--unselected" } flex-1`}
            onClick={()=>setSegment('details')}
          >
            Details
          </div>

          <div 
            className={`segmented__option flex-1 ${segment === "orderHistory" ? "segmented__option--selected": "segmented__option--unselected" }`}
            onClick={()=>setSegment('orderHistory')}
          >
            Order History
          </div>

          <div 
            className={`segmented__option flex-1 ${segment === "aiSuggestion" ? "segmented__option--selected": "segmented__option--unselected" }`} 
            onClick={()=>setSegment('aiSuggestion')}
          >
            AI Suggestions
          </div>

        </div>

        {segment === "details" ? 

          (
            <DetailsContainer data={data}/>
          ) : segment === "orderHistory" ? 

          (
            <OrderHistoryContainer id={data.id}/> ):
          (
            <AISuggestionContainer/>
          )
        }
        
      </div>

    </div>
  )
}