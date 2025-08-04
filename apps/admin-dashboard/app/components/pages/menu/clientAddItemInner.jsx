import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "../../common/alert";
import Form from "../../common/form";
import { ImageUploadField } from "../../common/imageUploadField";

import { useSingleMenu } from "../../../hooks/useMenu";
import { useMenuOptions } from "../../../hooks/useMenuOption";

export default function ClientAddItemInner({data}){

  const [imageFile, setImageFile] = useState(data?.image_url || null)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const { addSingleItemFormFields,  error } = useMenuOptions()
  if (error) return <p>Error: {error.message}</p>

  const router = useRouter()
  const { add, update} = useSingleMenu();

  const isEdit = Boolean(data)
  const initialData = { 
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    category: data?.category_id ||  "",
    branch: data?.branch_id ||  "",
    preparation_time: data?.preparation_time || "",
    ingredient: data?.ingredient || "",
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

      const payload = {
        ...values,
        price: Number(values.price),
        preparation_time: Number(values.preparation_time || 0),
        image_url: publicUrl,
        is_combo: false,
        is_active: true,
        available: true,
        restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID
      }

      if(isEdit){
        await update({id: data.id, ...payload})
      }else{
        await add(payload)
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        router.push("/menu")
      }, 2000)

    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading={`Could not ${isEdit ? "update!": "add"} item`}
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading={`Item ${isEdit ? "updated!": "added!"}`}
          subheading={`Item ${isEdit ? "updated!": "added!"} successfully`}
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

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
          submitLabel={submitting ? `${isEdit ? "Updating" : "Adding"}` : `${isEdit ? "Update Item" : "Add Item"}`}
        />

      </div>
    </>
  )
}