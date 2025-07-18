'use client'

import { useEffect, useState } from "react";
import BackButton from "../../../../../components/common/backButton";
import Form from "../../../../../components/common/form";
import SettingsNav from "../../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../../components/pages/settings/settingsHeadingIntro";
import { useRouter } from "next/navigation";
import Alert from "../../../../../components/common/alert";

export default function AddTables({data}){
  const router = useRouter()

  const initialData = { 
    tableName: data?.name || "", 
    capacity: data?.capacity || '' , 
    section: data?.type || '', 
    serviceCharge: data?.service_charge || '',
    branchId: data?.branch_id
  }

  const [branchOptions, setBranchOptions] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(()=>{
    const handleBranchOptions = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/common/branches`)
        const branchJson = await res.json()
        if (!res.ok) throw new Error(json.error || 'Unknown error')

        const branchData = branchJson.data.data;
        const branches = branchData.map(b => ({ value: b.id, label: b.name }))
        setBranchOptions(branches)
        
      } catch (error) {
        console.error("error fetching branches", error.message)
        throw new Error(error.message)
      }
    }

    handleBranchOptions()

  },[])

  const addTableFields = [
    { name: 'tableName', label: 'Table Name/Number', type: 'text', required: true },
    { name: 'capacity', label: 'Capacity', type: 'text', required: true },
    { name: 'section', label: 'Section', type: 'text', required: true },
    { name: 'serviceCharge', label: 'Service Charge', type: 'number', required: true },
    { name: 'branchId', label: 'Branch', type: 'select',
      options: [
        { value: '', label: 'Choose branch' },
        ...branchOptions.map(branch => ({
          value: branch.value,
          label: branch.label
        }))
        
      ],
      required: true 
    },
  ]

  async function handleSubmit(values) {
    const endpoint = data ? `/api/tables/${data.id}` : "/api/tables";
    const method = data ? "PUT" : "POST"

    setSubmitting(true)
    setErrorMsg(null)
    
    const payload = {
      name: values.tableName,
      capacity: values.capacity,
      type: values.section,
      service_charge: Number(values.serviceCharge),
      branch_id : values.branchId,
      is_active : true,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/settings/general/tables')
      }, 2000)

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
                  initialValues={initialData}
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