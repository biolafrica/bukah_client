export default function TableFooter(){
  return(
    <div className="flex flex-1 items-center justify-center md:justify-between py-4 px-5 border-t border-border-text sticky left-0 right-0">

      <div className=" hidden text-sm font-normal md:flex items-center gap-2">
        <div className="border border-border-text rounded-sm p-2 bg-white"> 
          <h4>10</h4> 
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sec-text">Items per page</span>
          <span>1-10 of 30 items</span>
        </div>

      </div>

      <div className="flex items-center gap-4">
        <button className="text-dis-text font-semibold">Prev</button>
        <div className="flex items-center gap-2">
          <span>1</span>
          <span className="text-dis-text">2</span>
          <span className="text-dis-text">3</span>
        </div>
        <button className="font-semibold">Next</button>
      </div>

    </div>
  )
}