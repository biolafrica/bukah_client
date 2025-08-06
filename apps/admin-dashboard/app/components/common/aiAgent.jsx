import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon, UserIcon } from "@heroicons/react/24/solid";

export default function AIAgent({ onClose }) {
  return (
    <div className="flex flex-col h-screen bg-white text-sm font-normal">

      <div className="flex items-center justify-between border-b border-border-text p-4 sticky top-0 bg-white z-10">
        <UserIcon className="w-5 h-5" />
        <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={onClose} />
      </div>

      <div className="flex gap-2 p-4 border-b border-border-text text-sm">
        <InformationCircleIcon className="w-6 h-6" />
        <div>
          <p className="font-semibold">I am here to help you manage your Restaurant Effectively</p>
          <p className="text-sec-text">You can ask me anything about your Restaurant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        <div className="chat flex flex-col gap-3">

          <div className="user flex items-center gap-3">
            <div className="font-bold p-2 bg-[#E2E6E9] rounded-full">
              AB
            </div>
            <h4 className="text-base">Hi</h4>
          </div>

          <div className="agent_reply text-sec-text tex-base">
            How's are you today? hope business is not too stressful
          </div>

        </div>

      </div>

      <div className="border-t border-border-text p-3 bg-white sticky bottom-0">
        <div className="flex items-end gap-2 bg-gray-100 rounded-md p-2">
          <textarea
            placeholder="Ask anything"
            className="w-full bg-transparent outline-none resize-none"
            rows={2}
          />
          <PaperAirplaneIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>

    </div>
  )
}