import { useState } from "react";
import CloseButton from "../../common/closeButton";
import DetailsContainer from "./detailsContainer";
import FeedbackContainer from "./feedbackContainer";
import TimelineContainer from "./timelineContainer";

export function OrderDetails({onClose, data}){
  const [segment, setSegment] = useState("details")
  
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton  
        title='Order Details'
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
            className={`segmented__option flex-1 ${segment === "timeline" ? "segmented__option--selected": "segmented__option--unselected" }`}
            onClick={()=>setSegment('timeline')}
          >
            Timeline
          </div>

          <div 
            className={`segmented__option flex-1 ${segment === "feedback" ? "segmented__option--selected": "segmented__option--unselected" }`} 
            onClick={()=>setSegment('feedback')}
          >
            Feedback
          </div>

        </div>

        {segment === "details" ? 

          (
            <DetailsContainer data={data}/>
          ) : segment === "timeline" ? 

          (
            <TimelineContainer data={data}/> ):
          (
            <FeedbackContainer/>
          )
        }

        
      </div>

    </div>
  )
}