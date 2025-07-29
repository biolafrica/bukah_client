"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import LoadingSpinner from "../../common/loadingSpinner";
import Alert from "../../common/alert";
import { ColorInput, LogoInput } from "../../common/logoInputField";

import { useSettings } from "../../../hooks/useSettings";

export default function BrandClientInner(){
  const router = useRouter();

  const { raw, isLoading, isError, updateSettings } = useSettings();
  const [errorMsg,   setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (isLoading) return <LoadingSpinner/>
  if (isError ) return <p>Failed to load settings</p>


  const handleLogo = (e) => {
    const files = e.target.files
    console.log("pri file",files[0])
  }

  const handleColorChange = async(field, color) => {  
    setErrorMsg(null)

    const payload={
      [field]: color.target.value,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID, 
    }

    try {
      await updateSettings(payload)

      setShowSuccess(true)
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false)
      }, 2000)
      
    } catch (err) {
      console.log(err.message)
      setErrorMsg(err.message)
    }

  }
  return(
    <>

      {errorMsg && (
        <Alert
          type="error"
          heading='Failed to update hours'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading='update succesful'
          subheading='hours updated successfully'
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <LogoInput 
        label="Primary Logo" 
        name={"primaryLogo"} 
        src="/images/Logo.png" 
        handleFileInputChange={handleLogo}
      />

      <LogoInput 
        label="Secondary Logo" 
        name={"secondaryLogo"} 
        src="/images/Logo.png" 
        handleFileInputChange={handleLogo}
      />

      <LogoInput 
        label="Favicon (optional)" 
        name={"faviconLogo"} 
        src="/images/Logo.png" 
        handleFileInputChange={handleLogo}
      />

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <ColorInput 
          label="Primary Colour" 
          handleColorInputChange={(c) => handleColorChange('primary_color', c)} 
          selectedColor={raw.primary_color ?? "#A8DF46" } 
        />
        
        <ColorInput 
          label="Secondary Colour" 
          handleColorInputChange={(c) => handleColorChange('secondary_color', c)} selectedColor={raw.secondary_color ?? "#243837"}
        />
      </div> 
    </>
  )
}