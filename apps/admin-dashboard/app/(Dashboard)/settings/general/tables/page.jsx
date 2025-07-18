"use client"
import SettingListCard from "../../../../components/pages/settings/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import { formatNaira } from "../../../../utils/format";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../../../../components/common/alert";

export default function Tables(){
  const router = useRouter();

  const [listCard, setListCard] = useState([])
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const data= {
    head: "Add New Tables",
    subHead: "Add tables to your restaurant here",
    button:"Add Table",
    link : '/settings/general/tables/add'
  }

  useEffect(()=>{
    const fetchAllTables = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tables`)
        const tableJson = await res.json()
        if (!res.ok) throw new Error(json.error || 'Unknown error')

        const tableData = tableJson.data.data;
        const tables = tableData.map(t => ({id:t.id, name:t.name, head:`${t.capacity} seater - ${t.type}`, subHead:`service charge ${formatNaira(t.service_charge)}`}));
        setListCard(tables)
     
      } catch (error) {
        console.error("error fetching tables", error.message)
        throw new Error(error.message)
      }
    }

    fetchAllTables()

  },[])

  const handleDelete = async(id)=>{
    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tables/${id}`,
        {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/general/tables')
      }, 2000)
      
    } catch (err) {
      if((err.message).includes("foreign key constraint")){
        setErrorMsg("Can't delete assigned table")
      }else {setErrorMsg(err.message)}
    }

  }

  const handleEdit = (id)=>{
    router.push(`/settings/general/tables/${id}`)
  }

  return(
    <>

      {errorMsg && (
        <Alert
          type="error"
          heading="Error"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading="Successfull"
          subheading="Table deleted succesfully"
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}


      <div className="tables_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden xl:block">
              <SettingsNav/>
            </div>

            <div className=" w-full xl:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info="Table Management"/>
              <AddSection data={data}/>

              <div>
                <SettingListCard data={listCard} onDelete={handleDelete} onEdit={handleEdit} />
              </div>
              
            </div>

          </div>

        </div>

      </div>
    </>
  )
}