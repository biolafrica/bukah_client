import { useEffect, useState } from 'react'
import * as outline from '@heroicons/react/24/outline'

export default function Alert({
  type = 'success',
  heading,
  subheading,
  duration = 5000,
  onClose
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => handleClose(), duration)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  const styleMap = {
    success: {
      bg: 'bg-[#243837]',
      icon: outline.CheckCircleIcon,
      iconColor: '#A8DF46'
    },
    error: {
      bg: 'bg-[#651a15]',
      icon: outline.XCircleIcon,
      iconColor: '#d63f35'
    },
    warning: {
      bg: 'bg-[#896f00]',
      icon: outline.ExclamationCircleIcon,
      iconColor: '#ffd41e'
    }
  }

  if (!visible) return null

  const { bg, icon: TypeIcon, iconColor } = styleMap[type]

  return (
    <div className={`${bg} fixed top-4 left-4 z-70 shadow rounded-[12px] p-4 flex items-start gap-3 text-white`}>      
    
      <TypeIcon className="w-6 h-6" style={{ color: iconColor }} />

      <div className="flex-grow">
        <h4 className="font-medium">{heading}</h4>
        {subheading && <p className="text-sm mt-1">{subheading}</p>}
      </div>

      <button
        onClick={handleClose}
        aria-label="Close alert"
        className="flex-shrink-0"
      >
        <outline.XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  )
}