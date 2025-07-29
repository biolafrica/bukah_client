"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import LoadingSpinner from "../../common/loadingSpinner";
import Alert from "../../common/alert";
import WeeklySchedule from "./businessHourTable";

import { useSettings } from "../../../hooks/useSettings";

export default function HoursClientInner(){
  const router = useRouter();

  const{raw, isLoading, isError, updateSettings} = useSettings();

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (isLoading) return <LoadingSpinner/>
  if (isError ) return <p>Failed to load settings</p>

  const initialSchedules = raw.business_hours ?? null

  async function handleSave(updatedSchedules) {
    setSubmitting(true)
    setErrorMsg(null)
   
    const payload ={
      business_hours :updatedSchedules,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      await updateSettings(payload)
      setShowSuccess(true)
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false)
      }, 2000)
      
    } catch (err) {
      setErrorMsg(err.message)
    }finally{
      setSubmitting(false)
    }

  }

  return(
    <>

      {errorMsg && (
        <Alert
          type="error"
          heading='Failed to update hours'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading='update succesful'
          subheading='hours updated successfully'
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <WeeklySchedule
        initialSchedules={initialSchedules || []}
        onSave={handleSave}
        isSubmitting={submitting}
      />

    </>
  )
}