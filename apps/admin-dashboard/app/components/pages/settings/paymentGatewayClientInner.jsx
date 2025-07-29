"use client"

import { gatewayFields } from "../../../data/formFields"
import Form from "../../common/form"

export default function PaymentGatewayClientInner(){
  const initialData = { publicKey: '',secretKey: '',callbackURL: '',gatewayName:''}

  async function handleSubmit(values) {
    // call API
  }

  return(
    <>
      <div className="xl:w-2/3">
        <Form  
          fields={gatewayFields}
          initialValues={initialData}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel="Save"
        />
      </div>
    </>
  )
}