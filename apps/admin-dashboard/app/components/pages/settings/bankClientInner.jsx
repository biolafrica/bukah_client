"use client"

import { bankFields } from "../../../data/formFields"
import Form from "../../common/form"

export default function BankClientInner(){

  const initialData = { bankName: '', accountName: '', accountNumber:''}

  async function handleSubmit(values) {
    // call API
  }

  return(
    <>
      <div className="xl:w-2/3">
        <Form 
          fields={bankFields}
          initialValues={initialData}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel="Save"
        />
      </div>
    </>
  )
}