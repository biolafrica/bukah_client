"use client"

import { ColorInput, LogoInput } from "../../../../components/pages/logoInputField"
import BackButton from "../../../../components/common/backButton"
import SettingsHeadingIntro from "../../../../components/pages/settingsHeadingIntro"
import SettingsNav from "../../../../components/layout/settingsNav"


export default function Brand(){
  function validate(values) {
    const errors = {}
    const prefix = (values.prefix ?? '').trim()

    if (prefix.length > 2) {
      errors.prefix = 'Prefix cannot be more than two letters.'
    }

    return errors
  }
  
  async function handleSubmit(values) {
    // call API
  }

  const handleLogo = (e) => {
    const files = e.target.files
    console.log("pri file",files[0])
  }

  const handleColor = (e) => {
    console.log(e.target.value)
  }


  return(
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
              <ColorInput label="Primary Colour" handleColorInputChange={handleColor} />
              <ColorInput label="Secondary Colour" handleColorInputChange={handleColor}/>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}