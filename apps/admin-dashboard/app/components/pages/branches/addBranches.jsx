import { branch } from "../../../data/branch";
import CloseButton from "../../common/closeButton";
import Form from "../../common/form";
import Alert from "../../common/alert";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBranch } from "../../../hooks/useBranch";
import { useSupervisorOptions } from "../../../hooks/useSupervisorOptions";

export default function AddBranches({onClose, row}){
  const router = useRouter();
  const {add, update} = useBranch()

  const isEdit = Boolean(row)
  const initialValues ={
    branchName: row?.name || "",
    address: row?.address || "",
    phone: row?.phone || "",
    offerPickup: row?.offers_pickup ||"",
    pickupCharges: row?.pickup_charge || "",
    offerEatIn: row?.offers_eatin || "",
    eatInCharges: row?.eatin_charge || "",
    isActive: row?.is_active || "",
    supervisor: row?.supervisor_id || "",
  }

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    data: supervisorOption,
    isLoading,
    isError,
    error,
  } = useSupervisorOptions()

  if (isLoading) return <p>Loading users…</p>
  if (isError)   return <p>Error: {error.message}</p>

  const addBranchesFormFields = branch.AddBranches(supervisorOption)

  const validate=(values)=>{
    const errors = {}
    const phone = (values.phone ?? '').trim()

    if (phone.length < 11 || phone.length > 11) {
      errors.phone = 'Phone number must be eleven digits.'
    }

    if (values.offerPickup === 'true') {
      if (values.pickUpCharges == null || values.pickUpCharges === '') {
        errors.pickUpCharges = 'Pickup charges are required when pickup is offered.'
      } else if (isNaN(Number(values.pickUpCharges)) || Number(values.pickUpCharges) < 0) {
        errors.pickUpCharges = 'Pickup charges must be a non-negative number.'
      }
    }

    if (values.offerEatIn === 'true') {
      if (values.eatInCharges == null || values.eatInCharges === '') {
        errors.eatInCharges = 'Eat-in charges are required when eat-in is offered.'
      } else if (isNaN(Number(values.eatInCharges)) || Number(values.eatInCharges) < 0) {
        errors.eatInCharges = 'Eat-in charges must be a non-negative number.'
      }
    }

    return errors
  }

  const handleSubmit= async(values)=>{
    setSubmitting(true)
    setErrorMsg(null)

    const booleanValue=(item)=>{
      return item === "true" ? true : false
    }

    const payload ={
      name: values.branchName,
      address:  values.address,
      phone:  values.phone,
      offers_pickup:  booleanValue(values.offerPickup),
      pickup_charge:  Number(values.pickupCharges),
      offers_eatin:   booleanValue(values.offerEatIn),
      eatin_charge: Number(values.eatInCharges),
      is_active:   booleanValue(values.isActive),
      supervisor_id:  values.supervisor,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      if (isEdit) {
        await update({ id: row.id, ...payload })
      } else {
        await add(payload)
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        router.push('/branches')
      }, 2000)

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
          heading="Failed to add branch"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading="branch added!"
          subheading="You will be redirected shortly."
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

        <CloseButton 
          title={`${isEdit ? "Update Branch":"Add Branch"}` } 
          onCancelClick={onClose} 
        />

        <div className='p-5'>
          <Form
            fields={addBranchesFormFields}
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 
              `${isEdit ? "Updating…":"Adding…"}` : 
              `${isEdit? "Update Branch":"Add Branch"}`
            }
          />
          
        </div>
        
      </div>
    </>
  )
}