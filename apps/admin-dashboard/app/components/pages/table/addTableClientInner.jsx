"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

import Alert from "../../common/alert";
import Form from "../../common/form";
import LoadingSpinner from "../../common/loadingSpinner";

import { useTables } from "../../../hooks/useTables";
import { useBranchOptions } from "../../../hooks/useBranchOptions"

import { tableField } from "../../../data/formFields"

export default function AddTableClientInner({data}){
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const { add, update} = useTables();

  const isEdit = Boolean(data)
  const initialValues = { 
    tableName: data?.name   || "", 
    capacity: data?.capacity    || '' , 
    section: data?.type     || '', 
    serviceCharge: data?.service_charge?.toString()  || '',
    branchId: data?.branch_id || ""
  }

  const {data: branchOptions, isLoading, isError, error } = useBranchOptions()

  if (isLoading) return <LoadingSpinner/>
  if (isError)   return <p>Error: {error.message}</p>

  const addTableFields = tableField(branchOptions)

  async function handleSubmit(vals) {
    setSubmitting(true)
    setErrorMsg(null)

    const payload = {
      name:           vals.tableName,
      capacity:       Number(vals.capacity),
      type:           vals.section,
      service_charge: Number(vals.serviceCharge),
      branch_id:      vals.branchId,
      is_active:      true,
      restaurant_id:  process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      if (isEdit) {
        await update({ id: data.id, ...payload })
      } else {
        await add(payload)
      }
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/general/tables')
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
          heading={`Failed to ${ data? "update" : 'add'} table`}
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading={`Table ${ data? "updated" : 'added'}!`}
          subheading={`table ${ data? "updated" : 'added'} succesfully.`}
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="xl:w-2/3">
        <Form   
          fields={addTableFields}
          initialValues={initialValues}
          validate={()=>[]} 
          onSubmit={handleSubmit}
          submitLabel={submitting ? `${ data? "Updateding table..." : 'Adding table...'}` : `${ data? "Update table" : 'Add table'}`}
        />
      </div>

    </>
  )
}