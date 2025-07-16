export default function FeedbackContainer(){
  const starLabel = ["stars label", "Poor Experience", "Okay Experience", 'Medium Experience', "Good Experience", 'Excellent Experience']
  
  return(
    <div className="mt-5">
      <div className="tex-sm border flex items-start gap-4 border-border-text rounded-xl p-5">

        <img src="/icons/5-star.svg" alt="rating icons" />

        <div className="flex flex-col gap-2">
          <h4 className="font-medium">{starLabel[5]}</h4>
          <h4 className="font-light text-sec-text">I had an exceptional dining experience at BUKAH restaurant! The meal was a delightful fusion of flavors, beautifully presented and cooked to perfection. The staff were attentive and friendly, making sure every need was met promptly. I can't wait to return for another unforgettable meal!</h4>
          <h4 className="font-medium text-[#63637A]">14-07-2025 | 10:30 </h4>
        </div>

      </div>
    </div>
  )
}