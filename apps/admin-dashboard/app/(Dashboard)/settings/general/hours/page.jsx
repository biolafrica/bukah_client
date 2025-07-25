"use client"

import {useState } from "react"
import { useRouter } from "next/navigation"

import SettingsNav from "../../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import WeeklySchedule from "../../../../components/pages/settings/businessHourTable"
import LoadingSpinner from "../../../../components/common/loadingSpinner"
import Alert from "../../../../components/common/alert"

import { useSettings } from "../../../../hooks/useSettings"



export default function Hours(){
  const{raw, isLoading, isError, updateSettings} = useSettings();

  const router = useRouter();
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

      <div className="hours_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden lg:block">
              <SettingsNav/>
            </div>

            <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info="Business Hours"/>
            
              <WeeklySchedule
                initialSchedules={initialSchedules || []}
                onSave={handleSave}
                isSubmitting={submitting}
              />
            
            </div>

          </div>

        </div>

      </div>

    </>
  )
}