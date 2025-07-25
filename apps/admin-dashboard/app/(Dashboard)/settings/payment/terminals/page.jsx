"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import SettingListCard from "../../../../components/pages/settings/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import LoadingSpinner from "../../../../components/common/loadingSpinner";

import { useTerminals } from "../../../../hooks/useTerminals";
import Alert from "../../../../components/common/alert";


export default function Terminals(){
  const router = useRouter()

  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const data= {
    head: "Add New Terminals",
    subHead: "Add and manage your pos terminals",
    button:"Add Terminal",
    link : '/settings/payment/terminals/add'
  }

  const { items, isLoading, isError, error, remove } = useTerminals()

  const handleDelete = async(id)=>{
    try {
      await remove(id)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/payment/terminals/')
      }, 2000)
     
    } catch (err) {
      setErrorMsg(
        err.message.includes("foreign key")
          ? "Can't delete assigned table"
          : err.message
      )
    }

  }
  
  const handleEdit = (id)=>router.push(`/settings/payment/terminals/${id}`)


  if (isLoading) return <LoadingSpinner/>
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
          subheading="Terminals deleted succesfully"
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
              <BackButton info="Terminals"/>
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