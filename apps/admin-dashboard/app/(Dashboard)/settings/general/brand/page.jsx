"use client"
import Form from "../../../../components/common/form"
import { storeFields } from "../../../../data/formFields"
import * as outline  from "@heroicons/react/24/outline"

export default function Brand(){

  function validate(values) {
    const errors = {}
    const prefix = (values.prefix ?? '').trim()

    if (prefix.length > 2) {
      errors.prefix = 'Prefix cannot be more than two letters.'
    }

    return errors
  }
  
  async function handleSubmit(values) {
    // call API
  }

  const initialData = { firstName: 'John', email: 'john@example.com' }


  return(
    <div className="brand_cont p-5 pt-30 lg:pl-75">
      <div className="border border-border-text rounded-md p-5 bg-white">
        <div className="border-b border-border-text flex items-center gap-2 mb-5 pb-2 font-semibold">
          <button><outline.ArrowLeftIcon className="w-5 h-5"/></button>
          <h4>Store Info</h4>
        </div>

        <h4>Business Hours</h4>
        <Form   
          fields={storeFields}
          initialValues={initialData}
          validate={validate} 
          onSubmit={handleSubmit}
          submitLabel="Save"
        />
       

      </div>

    </div>
  )
}