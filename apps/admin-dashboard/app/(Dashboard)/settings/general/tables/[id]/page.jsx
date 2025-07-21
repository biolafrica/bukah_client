import AddTables from "../add/page";

export default async function EditTable({params}){
  const {id} = await params;
  
  const tableRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tables/${id}`)
  const tableJson = await tableRes.json();


  const data = tableJson.table;
  return(
    <AddTables data={data}/>
  )
}