import { useRef, useState } from 'react'
import { PhotoIcon, TrashIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export function ImageUploadField({ 
  name, 
  value, 
  onChange,    // (File) => void 
  label, 
  requirementText 
}) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(value || null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  return (
    <div className="flex gap-4">
      {/* Preview square */}
      
      <div className="relative w-32 h-32 border border-border-text rounded-md flex items-center justify-center overflow-hidden">
        {preview
          ? (
            <>
              <img src={preview} className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => { setPreview(null); onChange(null) }}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
              >
                <TrashIcon className="w-5 h-5 text-red-600" />
              </button>
            </>
          )
          : (
            <PhotoIcon className="w-10 h-10 text-gray-300" />
          )
        }
      </div>

      {/* Text + Upload button */}
      <div className="flex-1 flex items-center justify-between h-32">

        <p className="text-sm text-gray-600">{requirementText}</p>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-outlined"
        >
          <ArrowUpTrayIcon className='w-4 h-4'/>
          Upload
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name={name}
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  )
}
