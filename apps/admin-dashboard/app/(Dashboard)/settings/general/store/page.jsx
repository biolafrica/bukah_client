"use client"
import SettingsNav from "../../../../components/layout/settingsNav"
import Form from "../../../../components/common/form"
import { storeFields } from "../../../../data/formFields"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import { useEffect, useState } from "react"
import Alert from "../../../../components/common/alert"
import { useRouter } from "next/navigation"

export default function Store(){
  const router = useRouter()
  const [items, setItems] = useState({})
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
        setItems(settingsData)
      } catch (error) {
        console.error("error fetching branches", error.message)
        throw new Error(error.message)
      }
    }

    fetchSettings()

  },[])

  function validate(values) {
    const errors = {}
    const prefix = (values.prefix ?? '').trim()
    const phoneNumber = (values.phoneNumber ?? '').trim()
    const tagline = (values.tagline ?? '').trim()
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    
    if(prefix.length > 2) {
      errors.prefix = 'Prefix cannot be more than two letters.'
    }
    
    if(tagline.length > 30) {
      errors.tagline = 'tagline cannot be more than 30 letters.'
    }

    if(phoneNumber.length < 11 || phoneNumber.length > 11) {
      errors.phoneNumber = 'Phone number must be eleven digits.'
    }

    if (!urlPattern.test(values.twitterLink || '')) {
      errors.twitterLink = 'Invalid URL';
    }
    if (!urlPattern.test(values.facebookLink || '')) {
      errors.facebookLink = 'Invalid URL';
    }
    if (!urlPattern.test(values.instagramLink || '')) {
      errors.instagramLink = 'Invalid URL';
    }
  
    return errors
  }

  const initialData = {
    businessName :items?.name || "",
    address: items?.address || "",
    emailAddress: items?.email || "",
    phoneNumber: items?.phone || "",
    twitterLink:items?.social_links?.twitter || "",
    facebookLink:items?.social_links?.facebook || "",
    instagramLink:items?.social_links?.instagram|| "",
    tiktokLink: items?.social_links?.tiktok|| "",
    prefix: items?.prefix || "",
    tagline: items?.tagline || ""
  }

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)
    
    const payload = {
      name: values.businessName,
      address: values.address,
      email: values.emailAddress,
      phone: values.phoneNumber,
      social_links : {
        twitter : values.twitterLink,
        facebook : values.facebookLink,
        instagram : values.instagramLink,
        tiktok : values.tiktokLink
      },
      prefix :values.prefix,
      tagline : values.tagline,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    console.log(payload)
    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${items.id}`,
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
          heading='Failed to update settings'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading='update succesful'
          subheading='settings updated successfully'
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="store_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden lg:block">
              <SettingsNav/>
            </div>

            <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info="Store Info"/>

              <div className="xl:w-2/3">
                <Form   
                  fields={storeFields}
                  initialValues={initialData}
                  validate={validate} 
                  onSubmit={handleSubmit}
                  submitLabel={submitting ? "updating...": "update"}
                />
              </div>
            </div>

          </div>

          
        

        </div>


      </div>

    </>
  )
}
