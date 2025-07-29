"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBranchOptions } from "../../../hooks/useBranchOptions";
import { terminalFields } from "../../../data/formFields";
import Alert from "../../common/alert";
import Form from "../../common/form";

import { useTerminals } from "../../../hooks/useTerminals";

export default function AddTerminalClientinner({data}){
  const router = useRouter()
  const { add, update} = useTerminals();

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const isEdit = Boolean(data)

  const initialValues = { 
    name: data?.name || '', 
    ipAddress: data?.ip_address || '' , 
    branchId: data?.branch_id || '', 
  }

  const {data: branchOptions, isLoading, isError, error } = useBranchOptions()

  if (isLoading) return <p>Loading branches…</p>
  if (isError)   return <p>Error: {error.message}</p>

  const addTerminalFields = terminalFields(branchOptions)

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)
    
    const payload ={
      name: values.name,
      ip_address: Number(values.ipAddress),
      branch_id: values.branchId,
      restaurant_id:  process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }
    console.log(payload)

    try {
      if (isEdit) {
        await update({ id: data.id, ...payload })
      } else {
        await add(payload)
      }
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/payment/terminals')
      }, 1500)
    
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setSubmitting(false)
    }

  }

  return(
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading={`Failed to ${ data? "update" : 'add'} terminal`}
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading={`Terminal ${ data? "updated" : 'added'}!`}
          subheading={`terminal ${ data? "updated" : 'added'} succesfully.`}
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="xl:w-2/3">
        <Form   
          fields={addTerminalFields}
          initialValues={initialValues}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel={submitting ? `${ data? "Updateding Terminal..." : 'Adding Terminal...'}` : `${ data? "Update Terminal" : 'Add Terminal'}`}
        />
      </div>
    </>
  )
}