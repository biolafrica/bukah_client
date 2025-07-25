import AddPos from "../add/page";

export default async function EditPos({params}){
  const {id} = await params;

  const posRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pos/${id}`)
  const posJson = await posRes.json()

  const data = posJson.pos
  return(
    <AddPos data={data}/>
  )

}