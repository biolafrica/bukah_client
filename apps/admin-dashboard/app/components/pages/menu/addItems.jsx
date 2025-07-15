import React, { useState } from 'react'
import Form from '../../common/form'
import { ImageUploadField } from '../../common/imageUploadField'

export default function AddItems({branchOptions, categoryOptions}){
  const [imageFile, setImageFile] = useState(null)

  const addSingleItemFormFields =[
    { name: 'itemName', label: 'Item Name', placeholder:"Enter item name", type: 'text', required: true },
    { name: 'description', label: 'Description', placeholder:"Describe the item", type: 'textarea', required: true, rows:3 },
    { name: 'price', label: 'Price(&#8358;)', placeholder:"0.00", type: 'number', required: true,},
    { name: 'category', label: 'Category', type: 'select',
      options: [
        { value: '', label: 'Choose category' },
        ...categoryOptions.map(category => ({
          value: category.value,
          label: category.label
        }))
        
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
    { name: 'cookingTime', label: 'Cooking Time(minutes)', placeholder:"How long does it take to prepare?", type: 'text', required: false},
    { name: 'ingredient', label: '  Ingredient', placeholder:"What are the ingredient used?", type: 'text', required: false},
    { name: 'image', type: 'custom', label: 'Item Image' },
  ]

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
  }

  async function handleSubmit(values){
    const fd = new FormData()
    fd.append('image', imageFile)
    Object.entries(values).forEach(([k,v]) => fd.append(k, v))

    console.log(fd)

  }
  
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white'>

      <Form
        fields={addSingleItemFormFields}
        initialValues={initialData}
        validate={validate}
        onSubmit={handleSubmit}
        submitLabel='Add Item'
      />

      <ImageUploadField
        name="image"
        value={imageFile}
        onChange={setImageFile}
        requirementText="JPG or PNG, max 2MB, square"
      />

    </div>
  )
}