import { useRouter } from 'next/navigation'
import * as outline  from "@heroicons/react/24/outline"

export default function BackButton({info}) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="border-b border-border-text flex items-center gap-2 mb-5 pb-2 font-semibold">
      <button
        type="button"
        onClick={handleBack}
        className='cursor-pointer'
      >
        <outline.ArrowLeftIcon className="w-5 h-5" aria-hidden="true"/>
      </button>
      {info && <h4>{info}</h4>}
    </div>
  )
}
