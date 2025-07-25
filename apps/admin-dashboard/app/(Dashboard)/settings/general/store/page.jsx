"use client"

import { useRouter } from "next/navigation"
import {useState } from "react"

import SettingsNav from "../../../../components/layout/settingsNav"
import Form from "../../../../components/common/form"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import Alert from "../../../../components/common/alert"
import LoadingSpinner from "../../../../components/common/loadingSpinner"

import { useSettings } from "../../../../hooks/useSettings"
import { storeFields } from "../../../../data/formFields"


export default function Store(){

  const { raw, isLoading, isError, updateSettings } = useSettings();
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (isLoading) return <LoadingSpinner/>
  if (isError ) return <p>Failed to load settings</p>

  const initialValues = {
    businessName:   raw.name ?? "",
    address:        raw.address ?? "",
    emailAddress:   raw.email ?? "",
    phoneNumber:    raw.phone ?? "",
    twitterLink:    raw.social_links?.twitter ?? "",
    facebookLink:   raw.social_links?.facebook ?? "",
    instagramLink:  raw.social_links?.instagram ?? "",
    tiktokLink:     raw.social_links?.tiktok ?? "",
    prefix:         raw.prefix ?? "",
    tagline:        raw.tagline ?? "",
    tax:            raw.tax ?? "",
  }

  function validateStoreInfo(values) {
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
    
    for (const key of ['twitterLink','facebookLink','instagramLink','tiktokLink']) {
      if (values[key] && !urlPattern.test(values[key])) {
        errors[key] = 'Invalid URL'
      }
    }

    return errors
  }

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)
    
    const payload = {
      name:         values.businessName,
      address:      values.address,
      email:        values.emailAddress,
      phone:        values.phoneNumber,
      social_links: {
        twitter:   values.twitterLink,
        facebook:  values.facebookLink,
        instagram: values.instagramLink,
        tiktok:    values.tiktokLink,
      },
      prefix:       values.prefix,
      tagline:      values.tagline,
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
      setErrorMsg(err.message || 'Unknown error')
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
                  initialValues={initialValues}
                  validate={validateStoreInfo} 
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
