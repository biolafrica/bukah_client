import Link from "next/link"

export function AddSection({data}){
  return(
    <div className="border border-border-text flex items-center justify-between rounded-md p-5 my-4">

      <div>
        <h4 className="text-sm mb-1">{data.head}</h4>
        <h4 className="text-sm text-sec-text hidden md:block">{data.subHead}</h4>
      </div>
      <Link href={`${data.link}`}><button className="btn btn-filled">{data.button}</button></Link>

    </div>
    
  )
}