import { format } from "date-fns";
import { formatNaira } from "../../../utils/format";
import CloseButton from "../../common/closeButton";

export default function MoreTransaction({onClose, data}){

  const summaryEnteries =[
    {label:"Transaction ID", value:data.id},
    {label:"Reference ID", value:data.reference_id},
    {label:"Payment Method", value:data.payment_method},
    {label:"Date", value:format(new Date(data.created_at),'dd-MM-yyyy')},
    {label:"Time", value:format(new Date(data.created_at), 'hh:mm a')},
    {label:"Gross Amount", value:formatNaira(data.total_amount)},
    {label:"Gateway Fee", value:formatNaira(data.gateway_fee)},
    {label:"Branch", value:data.branch.name},
    {label:"Order id", value:data.order.order_code},
  ]

  const statusStyle = data.transaction_type === "successful" ? "text-green-600 bg-green-100" : data.transaction_type === "pending" ? "text-yellow-600 bg-yellow-100" :"text-red-600 bg-red-100"

  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white'>
      <CloseButton
        title="Transactions Details"
        onCancelClick={onClose}
      />

      <div className="p-5 mb-4 text-base">
        <h4 className="font-normal">Amount</h4>
        <div className="flex items-center justify-between border border-border-text rounded-md p-5">
          <h4 className="text-3xl font-medium">{formatNaira(data.net_amount)}</h4>
          <h4 className={`${statusStyle} rounded-4xl px-6 py-2`}>{data.transaction_type}</h4>
        </div>
      </div>

      <div className="text-base p-5">
        <h4 className="font-normal">Transaction Summary</h4>

        <div className="flex flex-col gap-4 border border-border-text rounded-md p-5">
          {summaryEnteries.map(({label,value})=>(
            <div className="flex justify-between items-center" key={value}>
              <h4 className="text-sec-text">{label}:</h4>
              <h4>{value}</h4>
            </div>
          ))}

        </div>


        <button className="btn btn-filled w-full mt-4">Print Receipt</button>

      </div>

    </div>
  )
}