import * as outline     from '@heroicons/react/24/outline'
import Form from '../../common/form'

export default function AddEmployee({branchOptions, OnCancelClick}){

  const addEmployeeFormFields = [
    { name: 'firstName', label: 'First Name', placeholder:"Enter first name", type: 'text', required: true },

    { name: 'lastName', label: 'Last Name',  placeholder:"Enter last name", type: 'text', required: true },

    { name: 'emailAddress', label: 'Email Address', type: 'email', placeholder:"Enter email address", required: true },

    { name: 'phoneNumber', label: 'Phone Number', type: 'text',  placeholder:"Enter phone number", required: true },

    { name: 'role', label: 'Role', type: 'select',
      options: [
        { value: '',      label: 'Choose role' },
        { value: 'supervisor',  label: 'supervisor' },
        { value: 'manager', label: 'Manager' },
        { value: 'waiter', label: 'Waiter' },
        { value: 'chef', label: 'Chef' },
        { value: 'bartender', label: 'Bartender' },
      ],
      required: true 
    },

    { name: 'branch', label: 'Branch', type: 'select',
      options: [
        { value: '', label: 'Choose branch' },
        ...branchOptions.map(branch => ({
          value: branch.value,
          label: branch.label
        }))
        
      ],
      required: true 
    },
  ];

  const initialData = { 
    firstName: '', 
    firstName: "",
    emailAddress: '',
    phoneNumber: '',
    role : '',
    branch : '' 
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
    console.log(values)
  }


  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white'>

      <div className='flex items-center justify-between p-5 border-b border-border-text mb-5'>
        <h4 className='text-base font-medium'>Add Employee</h4>
        <outline.XMarkIcon className='w-4 h-4 cursor-pointer' onClick={OnCancelClick}/>
      </div>

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