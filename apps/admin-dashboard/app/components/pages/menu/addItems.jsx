'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Form from '../../common/form'
import { ImageUploadField } from '../../common/imageUploadField'
import CloseButton from '../../common/closeButton'

import { uploadFileAndGetUrl } from '../../../utils/imageStorage'
import { menu } from '../../../data/menu'


import { useMenuOptions } from '../../../hooks/useMenuOption'
import Alert from '../../common/alert'




export default function AddItems({onClose}){

  const [imageFile, setImageFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const { branchOptions, categoryOptions, loading, error } = useMenuOptions()

  if (error)  return <p>Error: {error.message}</p>

  const addSingleItemFormFields = menu.itemFormFields(categoryOptions, branchOptions)

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

    try {
      let publicUrl

      try {
        const uploadResult = await uploadFileAndGetUrl(
          imageFile,
          'products',
          'item',
          2 * 1024 * 1024,
          { restaurantId: process.env.NEXT_PUBLIC_RESTAURANT_ID }
        )
        publicUrl = uploadResult.publicUrl
      } catch (uploadErr) {
        setErrorMsg("Image upload failed: " + uploadErr.message)
        return
      }

      if (!publicUrl) {
        setErrorMsg("Image upload failed: no public URL returned")
        return
      }

      console.log("Uploaded image:", publicUrl)

      const payload = {
        name: values.itemName,
        description: values.description,
        price: Number(values.price),
        category_id: values.category,
        branch_id: values.branch,
        preparation_time: Number(values.cookingTime || 0),
        ingredient: values.ingredient,
        image_url: publicUrl,
        is_combo: false,
        is_active: true,
        available: true,
        restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
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
        router.push("/menu")
      }, 2000)

    } catch (err) {
      console.error("Final form error:", err)
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
          subheading="Item added successfully"
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