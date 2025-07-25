import AddTerminals from "../add/page";

export default async function EditTerminals({params}){
  const {id} = await params;

  const terminalRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/terminals/${id}`)
  const terminalJson = await terminalRes.json()

  const data = terminalJson.terminal;
  return(
    <AddTerminals data={data}/>
  )

}