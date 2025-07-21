"use client"

import { ColorInput, LogoInput } from "../../../../components/common/logoInputField"
import BackButton from "../../../../components/common/backButton"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import SettingsNav from "../../../../components/layout/settingsNav"
import { useEffect, useState } from "react"
import Alert from "../../../../components/common/alert"
import { useRouter } from "next/navigation"


export default function Brand(){

  const router = useRouter();
  const [items, setItems] = useState(null);
  const [errorMsg,   setErrorMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const [primaryColor, setPrimaryColor] = useState("")
  const [secondaryColor, setSecondaryColor] = useState("")

  
  useEffect(()=>{
    const fetchSettings = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
        const settingsJson = await res.json()

        if (!res.ok) throw new Error(json.error || 'Unknown error')

        const settingsData = settingsJson.settings.data[0];
        setItems(settingsData)

        setPrimaryColor(settingsData.primary_color   || "#A8DF46");
        setSecondaryColor(settingsData.secondary_color || "#243837");

      } catch (error) {
        console.error("error fetching settings", error.message)
        throw new Error(error.message)
      }
    }

    fetchSettings()

  },[])

  const handleLogo = (e) => {
    const files = e.target.files
    console.log("pri file",files[0])
  }

  const handlePriColor = async(e) => {
    setPrimaryColor(e.target.value)
  
    const payload ={
      primary_color :e.target.value,
      restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID,
    }

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${items.id}`,
        {
          method:"PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setShowSuccess(true)
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false)
      }, 2000)
      
    } catch (err) {
      console.log(err.error)
      setErrorMsg(err.message)
    }

  }

  const handleSecColor = (e) => {
    setSecondaryColor(e.target.value)
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

      <div className="brand_cont p-5 pt-30 lg:pl-75">
        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden lg:block">
              <SettingsNav/>
            </div>

            <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">

              <BackButton info="Brand Customization"/>

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
               <ColorInput label="Primary Colour" handleColorInputChange={handlePriColor} selectedColor={primaryColor} />
                
                <ColorInput label="Secondary Colour" handleColorInputChange={handleSecColor} selectedColor={secondaryColor}/>
              </div> 

            </div>

          </div>

        </div>

      </div>

    </>
  )
}