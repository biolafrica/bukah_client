"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

import Form from "../../components/common/form";
import { signInFields } from "../../data/formFields";
import Alert from "../../components/common/alert";

import { CircleStackIcon } from "@heroicons/react/24/solid";

export default function Login(){
  
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter();
  const supabase = createClient();

  const initialValues = {
    email : "",
    password : ""
  }

  const validateSignInInfo=(values)=>{
    const errors = {}
    const password = (values.password ?? '').trim()

    if (password.length >= 6 ) {
      errors.password = 'password must be at least 6 digits.'
    }

    if (!values.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errors.email = 'Invalid email address'
    
    return errors
  }

  const handleSubmit= async(values)=>{

    setSubmitting(true)
    setErrorMsg(null)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      console.error("Login error:", error.message)
      setErrorMsg(error.message)
    }

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      router.push('/')
    }, 1500)

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
          subheading="Login succesfully"
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

        <div className="border rounded-2xl p-10 md:1/2 lg:w-1/3 mx-auto bg-white/10 backdrop-blur-[40px] bg-gradient-to-r from-[#777777] to-[#404047] ">

          <h4 className="text-3xl font-semibold mb-2">Sign In</h4>
          <h4 className="text-base font-normal mb-9 text-[#c7c7c7]">Access real-time reports, manage staff, and keep your restaurant running efficiently</h4>

          <Form
            fields={signInFields}
            initialValues={initialValues}
            validate={validateSignInInfo} 
            onSubmit={handleSubmit}
            submitLabel={submitting ? "Authenticating" : "Sign In"}
          />

          <Link href="/email-reset" className="text-pri text-sm font-medium flex justify-center mt-2">Forget password?</Link>
        </div>

      </div>

    </>
  )
}