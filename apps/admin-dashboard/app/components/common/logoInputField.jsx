import { useRef, useState } from "react"
import * as outline from "@heroicons/react/24/outline"


export function LogoInput({label, src, name, handleFileInputChange}){
  const fileInputRef = useRef(null)


  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return(
    <div className="border border-border-text rounded-md p-5 mb-5">

      <div className="flex items-center justify-between">

        <h4 className="text-sm font-light">{label}</h4>
        <button onClick={handleUploadClick} className="btn btn-outlined">
          <outline.ArrowUpTrayIcon className="w-5 h-5"/>
          Upload
        </button>

      </div>

      <div className="flex items-center gap-2 mt-3">

        <div className="border border-border-text rounded-md p-2 w-[152px] h-[76px]">
          <img src={`${src}`} alt="" className="w-[100px] h-[60px] object-contain" />
        </div>

        <input 
          ref={fileInputRef} 
          accept="image/*" 
          className="w-full h-[76px] p-5 text-sec-text border border-dashed rounded-md border-sec-text hidden md:block" 
          type="file" 
          alt={label}
          name={name}
          onChange={handleFileInputChange} 
        />

      </div>

    </div>

  )
}


export function ColorInput({label, selectedColor, handleColorInputChange,}){
  const colorInputRef = useRef(null)

  const handleUploadClick = () => {
    colorInputRef.current?.click()
  }


  return(
    <div className="border border-border-text rounded-md p-5 mb-5">

      <div className="flex items-center justify-between">

        <h4 className="text-sm font-light">{label}</h4>
        <button onClick={handleUploadClick} className="btn btn-outlined">
          change
        </button>

      </div>

      <div className="flex items-center gap-2 mt-3">

        <div className='border border-border-text rounded-md p-2 w-[152px] h-[76px] hidden' 
          style={{ backgroundColor: selectedColor }}
        >
          
        </div>

        <input
          ref={colorInputRef}
          type="color"
          value={selectedColor}
          onChange={handleColorInputChange}
          className="w-[152px] h-[76px]"
        />
        
      </div>

    </div>
  )
}