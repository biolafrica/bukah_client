'use client'

import BackButton from "../../../../../components/common/backButton";
import Form from "../../../../../components/common/form";
import SettingsNav from "../../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../../components/pages/settings/settingsHeadingIntro";
import Alert from "../../../../../components/common/alert";
import { tableField } from "../../../../../data/formFields";

import { useRouter } from "next/navigation";
import { useBranchOptions } from "../../../../../hooks/useBranchOptions";
import { useTables } from "../../../../../hooks/useTables";
import {useState } from "react";

export default function AddTables({data}){
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

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const {data: branchOptions, isLoading, isError, error } = useBranchOptions()

  if (isLoading) return <p>Loading branches…</p>
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

      <div className="tables_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden lg:block">
              <SettingsNav/>
            </div>

            <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info={`${ data? "Edit table" : 'Add table'}`}/>

              <div className="xl:w-2/3">
                <Form   
                  fields={addTableFields}
                  initialValues={initialValues}
                  validate={()=>[]} 
                  onSubmit={handleSubmit}
                  submitLabel={submitting ? `${ data? "Updateding table..." : 'Adding table...'}` : `${ data? "Update table" : 'Add table'}`}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

    </>
    
    

  )
}