"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import LoadingSpinner from "../../common/loadingSpinner"
import Alert from "../../common/alert"
import SettingListCard from "../settings/settingListCard"

import { useTerminals } from "../../../hooks/useTerminals"

export default function TerminalClientinner(){
  const router = useRouter()

  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

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

      <div>
        <SettingListCard data={items} onDelete={handleDelete} onEdit={handleEdit} />
      </div>

    </>
  )
}