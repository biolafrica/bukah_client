"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

import SettingListCard from "../../../../components/pages/settings/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import LoadingSpinner from "../../../../components/common/loadingSpinner";

import { usePos } from "../../../../hooks/usePos";
import Alert from "../../../../components/common/alert";


export default function POS(){
  const router = useRouter()

  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const data= {
    head: "Add New POS",
    subHead: "Add and manage your POS machines",
    button:"Add POS",
    link : '/settings/payment/pos/add'
  }

  const { items, isLoading, isError, error, remove } = usePos()


  const handleDelete = async(id)=>{
    try {
      await remove(id)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/payment/pos/')
      }, 2000)
     
    } catch (err) {
      setErrorMsg(
        err.message.includes("foreign key")
          ? "Can't delete assigned table"
          : err.message
      )
    }
  }

  const handleEdit = (id)=>router.push(`/settings/payment/pos/${id}`)


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
          subheading="pos deleted succesfully"
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
              <BackButton info="POS"/>
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