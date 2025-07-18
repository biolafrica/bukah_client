import Form from '../../common/form'
import CloseButton from '../../common/closeButton';
import { employee } from '../../../data/employee';
import { useState } from 'react';

export default function AddEmployee({branchOptions, setSideScreenOpen}){

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

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

    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      errors.phoneNumber = 'Phone number must be eleven digits.'
    }

    return errors
  }

  async function handleSubmit(values){ 
    setSubmitting(true)
    setError(null)

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
      console.log(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
 
    }

  }


  return(
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
          submitLabel='Send Invite'
        />
        
      </div>
    </div>

  )
}