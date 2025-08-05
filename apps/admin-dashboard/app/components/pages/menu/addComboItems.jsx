"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "../../common/alert";
import CloseButton from "../../common/closeButton";
import ComboItemForm from "./comboItemsForm";
import { uploadFileAndGetUrl } from "../../../utils/imageStorage";
import { useComboMenu, useFetchCombo } from "../../../hooks/useMenu";
import TableLoading from "../../common/tableLoading";


export default function AddComboItems({onClose, id}){
  const [errorMsg, setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()
  const { add, update} = useComboMenu();

  const {error, data, isLoading} = useFetchCombo(id);
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = async(values)=>{
    setErrorMsg(null)

    try {
      let publicUrl = values.image_url;

      if (values.image_url instanceof File) {
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

      if(id){
        await update({id, ...payload})
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
      console.log(error)
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

        {isLoading && <TableLoading/>}
        {!isLoading && (<ComboItemForm onSubmit={handleSubmit} initialValue={data} setErrorMsg={setErrorMsg}/>)}

      </div>

    </>
  )
}