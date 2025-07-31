"use client"

import { CircleStackIcon } from "@heroicons/react/24/solid";
import Form from "../../components/common/form";
import { emailInviteFields } from "../../data/formFields";

export default function EmailReset(){
  const initialValues = {
    email : "",
  }

  const validateEmailInInfo=(values)=>{
    const errors = {}

    if (!values.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errors.email = 'Invalid email address'

    return errors

  }

  const handleSubmit=(values)=>{
    console.log(values)
  }
 
  return(
    <div
      className="relative h-screen w-full bg-cover bg-center text-white p-10"
      style={{ backgroundImage: "url('/admin/images/background.png')" }}
    >

      <div 
        className="flex items-center justify-center gap-3 mb-25">
        <CircleStackIcon className="h-10 w-10 text-pri"/>
        <h4 className="text-6xl font-extrabold">BUKAH</h4>
      </div>

      <div className="border rounded-2xl p-10 md:1/2 lg:w-1/3 mx-auto bg-white/10 backdrop-blur-[40px] bg-gradient-to-r from-[#777777] to-[#404047]">
        <h4 className="text-3xl font-semibold mb-2">Forget Password?</h4>
        <h4 className="text-base font-normal mb-9 text-[#c7c7c7]">Enter your email address so we can send a link to reset your password</h4>

        <Form
          fields={emailInviteFields}
          initialValues={initialValues}
          validate={validateEmailInInfo} 
          onSubmit={handleSubmit}
          submitLabel="Send Reset Link"
        />

      </div>
     
    </div>
  )
}