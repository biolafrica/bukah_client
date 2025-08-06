"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { profileFields } from "../../../data/formFields";
import Alert from "../../common/alert";
import Form from "../../common/form";

export default function ProfileClientInner(){
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: ""
  }

  function validateProfileInfo(values) {}

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)
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

      <div className="xl:w-2/3">
        <Form  
          fields={profileFields}
          initialValues={initialValues}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel={submitting ? "updating...": "update"}
        />
      </div>

    </>
  )
}
