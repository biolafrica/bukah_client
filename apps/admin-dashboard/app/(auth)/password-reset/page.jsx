"use client"

import { CircleStackIcon } from "@heroicons/react/24/solid";
import { PasswordResetFields } from "../../data/formFields";
import Form from "../../components/common/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../../../../packages/utils/supabase/client.mjs";
import Alert from "../../components/common/alert";

export default function PasswordReset(){
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter();
  const supabase = createClient();

  const initialValues = {
    newPassword : "",
    confirmPassword : "",
  }

  const validatePassword=(values)=>{
    const errors = {}

    if (!values.newPassword) {
      errors.newPassword = "Required"
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters"
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required"
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords must match"
    }
    return errors
  }

  const handleSubmit= async (values)=>{
    setSubmitting(true)
    setErrorMsg(null)

    const password = values.confirmPassword;

    const { data, error } = await supabase.auth.updateUser({ password })

    if(error){
      setErrorMsg(error.message)
    }else{
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/')
      }, 1500)
    }

    setSubmitting(false)
  }

 
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
          subheading="Account setup succesfully"
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div
        className="relative h-screen w-full bg-cover bg-center text-white p-10"
        style={{ backgroundImage: "url('/admin/images/background.png')" }}
      >

        <div className="flex items-center justify-center gap-3 mb-15">
          <CircleStackIcon className="h-10 w-10 text-pri"/>
          <h4 className="text-6xl font-extrabold">BUKAH</h4>
        </div>

        <div className="border rounded-2xl p-10 md:1/2 lg:w-1/3 mx-auto bg-white/10 backdrop-blur-[40px] bg-gradient-to-r from-[#777777] to-[#404047]">
          <h4 className="text-3xl font-semibold mb-2">Forget Password?</h4>
          <h4 className="text-base font-normal mb-9 text-[#c7c7c7]">Enter your email address so we can send a link to reset your password</h4>

          <Form
            fields={PasswordResetFields}
            initialValues={initialValues}
            validate={validatePassword} 
            onSubmit={handleSubmit}
            submitLabel={submitting ? "Setting Password" : "Reset Password"}
          />
        </div>
      </div>

    </>
  )
}