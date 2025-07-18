import React, { useState } from 'react'
import Form from '../../common/form'
import { ImageUploadField } from '../../common/imageUploadField'
import CloseButton from '../../common/closeButton'
import { useOptions } from '../../context/optionsContext'
import { order } from '../../../data/order'
import { createClient } from '@supabase/supabase-js'


export default function AddItems({onClose}){

  const supabase = createClient( 
    process.env.NEXT_PUBLIC_SUPABASE_URL,  
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )


  const [imageFile, setImageFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)


  const { categoryOptions, branchOptions, } = useOptions()
  const addSingleItemFormFields = order.itemFormFields(categoryOptions,branchOptions)

  const initialData = { 
    itemName: "",
    description : "",
    price : "",
    category : "",
    branch : "",
    cookingTime : "",
    ingredient : "",
  };

  function validate(values) {
    const errors = {}
    if (!imageFile) errors.image = 'Please upload an image'
    return errors
  };

  async function handleSubmit(values){
    setSubmitting(true)
    setErrorMsg(null)

    
    if (imageFile.size > 2 * 1024 * 1024) {
      setErrorMsg('Image must be under 2 MB')
      setSubmitting(false)
      console.log("too large")
      return
    }

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `item_${Date.now()}.${fileExt}`
    console.log("file name", fileName)

    const { error: uploadError } = await supabase
    .storage
    .from('products')
    .upload(fileName, imageFile, { 
      upsert: false, 
      contentType: imageFile.type,
      metadata:{
        userId: "92e1ccc2-8779-4f5d-babe-3699221a146c",
      }  
    })

    if (uploadError) {
      setErrorMsg(`Upload failed: ${uploadError.message}`)
      setSubmitting(false)
      console.log("upload error", uploadError)
      return
    }

    const { publicUrl, error: urlError } = supabase
    .storage
    .from('products')
    .getPublicUrl(fileName)

    if (urlError) {
      setErrorMsg(`Cannot retrieve image URL: ${urlError.message}`)
      setSubmitting(false)
      console.log("url error", urlError)
      return
    }

    const payload = {
      name:         values.itemName,
      description:  values.description,
      price:        Number(values.price),
      category_id:  values.category,
      branch_id:    values.branch,
      preparation_time: Number(values.cookingTime || 0),
      ingredient:   values.ingredient,
      image_url:    publicUrl
    }

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
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
        onClose()
        router.refresh()
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
          heading="Could not add item"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}
      {showSuccess && (
        <Alert
          type="success"
          heading="Item added!"
          subheading="Closing form…"
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

        <CloseButton 
          title='Add Items'
          onCancelClick={onClose}
        />

        <div className='p-5 flex flex-col gap-3'>

          <div>
            <h4 className='mb-1 text-sm font-medium'>Item image</h4>
            <ImageUploadField
              name="image"
              value={imageFile}
              onChange={setImageFile}
              requirementText="JPG or PNG, max 2MB, square"
            />
          </div>

          <Form
            fields={addSingleItemFormFields}
            initialValues={initialData}
            validate={validate}
            onSubmit={handleSubmit}
            submitLabel={submitting ? 'Adding…' : 'Add Item'}
          />

        </div>
      </div>
    </>
  )
}