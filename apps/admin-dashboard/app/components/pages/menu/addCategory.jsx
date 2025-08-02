import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "../../common/alert";
import CloseButton from "../../common/closeButton";
import Form from "../../common/form";

import { menu } from "../../../data/menu";

export default function AddCategory({onClose}){
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const initialData = { 
    name: "",
    description : "",
  };

  const handleSubmit = async(values)=>{
    setSubmitting(true)
    setErrorMsg(null)
    const payload ={
      ...values,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        router.push("/menu?segment=categories")
      }, 2000)
      
    } catch (error) {
      console.error("Final form error:", err)
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
          heading="Could not add category"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading="Category added!"
          subheading="category added successfully"
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

        <CloseButton 
          title='Add Category'
          onCancelClick={onClose}
        />

        <div className='p-5 flex flex-col gap-3'>
          <Form
            fields={menu.categoryFormFields}
            initialValues={initialData}
            validate={()=>([])}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 'Adding…' : 'Add Category'}
          />

        </div>

      </div>
    </>
  )
}