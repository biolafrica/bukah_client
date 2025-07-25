'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

import BackButton from "../../../../../components/common/backButton";
import Form from "../../../../../components/common/form";
import SettingsNav from "../../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../../components/pages/settings/settingsHeadingIntro";
import Alert from "../../../../../components/common/alert";

import { usePos } from "../../../../../hooks/usePos";
import { useBranchOptions } from "../../../../../hooks/useBranchOptions";
import { posFields} from "../../../../../data/formFields";



export default function AddPos({data}){
  const router = useRouter()
  const { add, update} = usePos();

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const isEdit = Boolean(data)

  const initialValues = {
    name: data?.name || '', 
    posProvider: data?.pos_provider || '' ,
    accountName: data?.account_name ||  '', 
    accountNumber: data?. account_number || '', 
    branchId: data?.branch_id || ''
  }

  const {data: branchOptions, isLoading, isError, error } = useBranchOptions()

  if (isLoading) return <p>Loading branches…</p>
  if (isError)   return <p>Error: {error.message}</p>

  const addPOSFields = posFields(branchOptions)

  const validatePOSInfo=(values)=>{
    const errors = {}

    const accountNumber = (values.accountNumber ?? '').trim()
    if(accountNumber.length < 10 || accountNumber.length > 10) {
      errors.accountNumber = 'account number must be 10 digits.'
    }

    return errors
   
  }

  async function handleSubmit(values) {
    setSubmitting(true)
    setErrorMsg(null)

    const payload ={
      name : values.name,
      pos_provider :values.posProvider,
      account_name : values.accountName,
      account_number : values.accountNumber,
      branch_id : values.branchId,
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
        router.push('/settings/payment/pos')
      }, 1500)
    } catch (err) {
      setErrorMsg(err.message)
    }finally{
      setSubmitting(false)
    }
  
  }
  
  return(
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading={`Failed to ${ data? "update" : 'add'} pos`}
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading={`pos ${ data? "updated" : 'added'}!`}
          subheading={`pos ${ data? "updated" : 'added'} succesfully.`}
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="tables_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden lg:block">
              <SettingsNav/>
            </div>

            <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info={`${ data? "Edit pos" : 'Add pos'}`}/>

              <div className="xl:w-2/3">
                <Form   
                  fields={addPOSFields}
                  initialValues={initialValues}
                  validate={validatePOSInfo} 
                  onSubmit={handleSubmit}
                  submitLabel={submitting ? `${ data? "Updateding POS..." : 'Adding POS...'}` : `${ data? "Update POS" : 'Add POS'}`}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}