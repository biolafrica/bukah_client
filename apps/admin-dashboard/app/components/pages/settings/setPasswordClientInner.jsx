"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import { setPasswordFields } from "../../../data/formFields";
import Alert from "../../common/alert";
import Form from "../../common/form";


export default function SetPasswordClientInner(){
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const initialValues = {
    cuurent_password: "",
    new_password: "",
    confirm_password: ""
  }
  
  function validatePasswordInfo(values) {

  }

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)
  }

  return(
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading='Failed to update password'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading='update succesful'
          subheading='password updated successfully'
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="xl:w-2/3">
        <Form  
          fields={setPasswordFields}
          initialValues={initialValues}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel={submitting ? "updating...": "update"}
        />
      </div>

    </>
  )
}
