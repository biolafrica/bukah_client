"use client"
import SettingListCard from "../../../../components/pages/settings/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import Alert from "../../../../components/common/alert";

import { useTables } from "../../../../hooks/useTables";
import {useState } from "react";
import { useRouter } from "next/navigation";

export default function Tables(){

  const router = useRouter()
  const { items, isLoading, isError, error, remove } = useTables()
 
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const data= {
    head: "Add New Tables",
    subHead: "Add tables to your restaurant here",
    button:"Add Table",
    link : '/settings/general/tables/add'
  }

  const handleDelete = async (id) => {
    try {
      await remove(id)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/general/tables')
      }, 2000)
     
    } catch (err) {
      setErrorMsg(
        err.message.includes("foreign key")
          ? "Can't delete assigned table"
          : err.message
      )
    }
  }

  const handleEdit = (id) => router.push(`/settings/general/tables/${id}`)

  if (isLoading) return <p>Loading…</p>
  if (isError)   return <p>Error: {error.message}</p>
  
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
                <SettingListCard data={items} onDelete={handleDelete} onEdit={handleEdit} />
              </div>
              
            </div>

          </div>

        </div>

      </div>
    </>
  )
}