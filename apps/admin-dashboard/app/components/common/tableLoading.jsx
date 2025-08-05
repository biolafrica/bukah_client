export default function TableLoading(){
  return(
    <div className=" mb-5 flex flex-col gap-3 min-w-[200px] animate-pulse " >
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  )
}

