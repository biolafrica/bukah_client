import Form from '../../common/form'
import CloseButton from '../../common/closeButton';
import { employee } from '../../../data/employee';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../common/alert';

export default function AddEmployee({branchOptions, setSideScreenOpen}){
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const addEmployeeFormFields = employee.addField(branchOptions)

  const initialData = { 
    firstName: '', 
    lastName: '',
    email: '',
    phoneNumber: '',
    role : '',
    branchId: '' 
  };

  function validate(values) {
    const errors = {}
    const phoneNumber = (values.phoneNumber ?? '').trim()

    if (!values.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errors.email = 'Invalid email address'

    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      errors.phoneNumber = 'Phone number must be eleven digits.'
    }

    return errors
  }

  async function handleSubmit(values){ 
    setSubmitting(true)
    setErrorMsg(null)

    const payload ={
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      role: values.role,
      branch_id: values.branchId,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
      is_active: true
    }

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')

      setShowSuccess(true)
    
      setTimeout(() => {
        setShowSuccess(false)
        setSideScreenOpen(false)
        router.push('/employees')
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
          heading="Failed to add employee"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading="Employee added!"
          subheading="You will be redirected shortly."
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}
  
      <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white'>

        <CloseButton 
          title="Add Employee" 
          onCancelClick={()=>setSideScreenOpen(false)} 
        />

        <div className='p-5'>
          <Form
            fields={addEmployeeFormFields}
            initialValues={initialData}
            validate={validate}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 'Sending…' : 'Send Invite'}
          />
          
        </div>
      </div>

    </>
  )
}