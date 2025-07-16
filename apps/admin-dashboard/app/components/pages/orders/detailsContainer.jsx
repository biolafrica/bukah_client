import Image from "next/image"
import { formatNaira } from "../../../utils/format"

export default function DetailsContainer(){
  const summarydata =[
    {key: 1, label:'Order ID', value:"#901234"},
    {key: 2, label:'Status', value:"Completed"},
    {key: 3, label:'Date', value:"14-05-2025"},
    {key: 4, label:'Time', value:"12:00pm"},
    {key: 5, label:'Branch', value:"Branch A"},
    {key: 6, label:'Staff', value:"Abiodun Biobaku"},
    {key: 7, label:'Order Channel', value:"Online"},
    {key: 8, label:'Payment Method', value:"POS"},
  ]
  const customerDetails = [
    {key: 1, label:'Type', value:"Registered Customer"},
    {key: 2, label:'Name', value:"John Dumebi"},
    {key: 3, label:'Email', value:"john@gmail.com"},
    {key: 4, label:'Phone Number', value:"08185191968"},
  ]

  const  itemsData = [
    {key: 1, item:'Ofada Rice', quantity:"5" , price:"5000", src:"/images/food.png"},
    {key: 2, item:'Meat', quantity:"2" , price:"2000", src:"/images/food.png"},
    {key: 3, item:'Plantain', quantity:"1" , price:"500", src:"/images/food.png"}
  ]

  return(
    <div className="mt-5 text-sm">

      <div className="order_summary_container mb-6">
        <h4 className="font-medium mb-2">Order Summary</h4>
        <div className="p-5 border border-border-text rounded-md flex flex-col gap-3 w-full">

          {summarydata.map((item)=>(
            <div className="flex items-center justify-between font-light tex-sm" key={item.key}>
              <h4 className=" text-sec-text">{item.label}:</h4>
              <h4>{item.value}</h4>
            </div>
          ))}

        </div>
      </div>

      <div className="customer_details_container mb-6">
        <h4 className="font-medium mb-2">Customer Details</h4>
        <div className="p-2 border border-border-text rounded-md w-full">
          {customerDetails.map((item)=>(
            <div className="flex items-center justify-between font-light tex-sm mb-2" key={item.key}>
              <h4 className=" text-sec-text">{item.label}:</h4>
              <h4>{item.value}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="customer_details_container mb-6">
        <h4 className=" font-medium mb-2">Items(s) Ordered</h4>
        
        <div className="p-5 border border-border-text rounded-md w-full flex flex-col gap-5">

          <div className="flex flex-col gap-3">
            {itemsData.map((item)=>(
              <div 
                className="flex items-center justify-between font-light tex-sm 2 border border-border-text p-5 max-h-[91px] rounded-md"
                key={item.key}
              >
                <div className="flex items-center gap-3">
              
                  <Image
                    src={item.src}
                    width={70}
                    height={64}
                    alt ={item.item}
                  />
                  
                  <h4>
                    {item.item}<span className="ml-2">X{item.quantity}</span>
                  </h4>

                </div>

                <div>
                  <h4>{formatNaira(item.price)}</h4>
                </div>
              
              </div>
            ))}
           
          </div>

          <div className=" flex flex-col gap-3 items-end text-sec-text font-medium text-left">
            <h4>Sub-total: <span className="ml-20 text-pri-text">{formatNaira(16400)}</span></h4>
            <h4>Service Fee: <span className="ml-20 text-pri-text">{formatNaira(650)}</span></h4>
            <h4>Total: <span className="ml-20 text-pri-text">{formatNaira(17050000)}</span></h4>
          </div>

        </div>

      </div>

      <button className="btn btn-filled w-full">Print Receipt</button>

    </div>
  )
}