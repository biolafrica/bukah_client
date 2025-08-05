"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "../../common/alert";
import CloseButton from "../../common/closeButton";
import ComboItemForm from "./comboItemsForm";
import { uploadFileAndGetUrl } from "../../../utils/imageStorage";


export default function AddComboItems({onClose}){
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async(values)=>{
    setErrorMsg(null)

    try {
      let publicUrl

      try {
        const uploadResult = await uploadFileAndGetUrl(
          values.image_url,
          'products',
          'combo_item',
          2 * 1024 * 1024,
          { restaurantId: process.env.NEXT_PUBLIC_RESTAURANT_ID }
        );
        publicUrl = uploadResult.publicUrl
        
      } catch (uploadErr) {
        console.log("upload error",uploadErr)
        setErrorMsg("Image upload failed: " + uploadErr.message)
        return
      }
      if (!publicUrl) {

        setErrorMsg("Image upload failed: no public URL returned")
        return
      }

      const payload = {
        ...values,
        image_url :publicUrl,
        restaurant_id:process.env.NEXT_PUBLIC_RESTAURANT_ID
      }
      console.log("payload", payload)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/combo`, {
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
      setErrorMsg(err.message)
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

        <ComboItemForm onSubmit={handleSubmit}/>

      </div>

    </>
  )
}