import { useRouter } from 'next/navigation'
import * as outline  from "@heroicons/react/24/outline"

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className='cursor-pointer'
    >
      <outline.ArrowLeftIcon className="w-5 h-5" aria-hidden="true"/>
    </button>
  )
}