import { useState } from "react";
import { branch } from "../../../data/branch";
import CloseButton from "../../common/closeButton";
import Form from "../../common/form";
import Alert from "../../common/alert";

export default function AddBranches({onClose, row}){

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const addBranchesFormFields = branch.AddBranches()

  const initialValues ={
    branchName: "",
    address: "",
    phone: "",
    offerPickup: "",
    pickupCharges: "",
    offerEatIn: "",
    eatInCharges: "",
    isActive: "",
    supervisor: "",
  }

  const validate=(values)=>{
    const errors = {}

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

  const handleSubmit=(values)=>{
    console.log(values)
   
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
          title="Add Employee" 
          onCancelClick={onClose} 
        />

        <div className='p-5'>
          <Form
            fields={addBranchesFormFields}
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 'Adding…' : 'Add Branch'}
          />
          
        </div>
      </div>
    </>
  )
}