"use client"

import SettingsNav from "../../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import WeeklySchedule from "../../../../components/pages/settings/businessHourTable"
import { useEffect, useState } from "react"
import Alert from "../../../../components/common/alert"
import { useRouter } from "next/navigation"

export default function Hours(){
  const router = useRouter();
  const [items, setItems] = useState(null)
  const [id,setId] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(()=>{
    const fetchSettings = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
        const settingsJson = await res.json()

        if (!res.ok) throw new Error(json.error || 'Unknown error')

        const settingsData = settingsJson.settings.data[0];
        setItems(settingsData.business_hours)
        setId(settingsData.id)
      } catch (error) {
        console.error("error fetching settings", error.message)
        throw new Error(error.message)
      }
    }

    fetchSettings()

  },[])


  async function handleSave(updatedSchedules) {
    setSubmitting(true)
    setErrorMsg(null)
   
    const payload ={
      business_hours :updatedSchedules,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${id}`,
        {
          method:"PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setShowSuccess(true)
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false)
      }, 2000)
    } catch (err) {
      console.log(err.error)
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
          
            { items &&
              <WeeklySchedule
                initialSchedules={items}
                onSave={handleSave}
                isSubmitting={submitting}
              />
            }
            </div>

          </div>

        </div>

      </div>

    </>
  )
}