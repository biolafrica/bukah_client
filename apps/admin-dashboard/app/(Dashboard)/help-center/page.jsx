import * as outline  from "@heroicons/react/24/outline"

export default function HelpCenter() {
  return (
    <div className="help_center_body p-5 pt-30 lg:pl-75">

      <h2 className="text-3xl mb-2 ">Help Center</h2>
      <h4 className="text-sm text-gray-500 mb-4 font-light">
        Find support, get help with issues and connect with our team anytime
      </h4>

      <div className="flex flex-1 flex-col gap-2 items-center justify-center bg-white border border-gray-200 rounded-md h-130">

        <outline.WrenchScrewdriverIcon className="h-20 w-20 mb-10 text-gray-500"/>

        <h4 className="text-base text-gray-500 font-light w-1/3 text-center">
          If you need assistant or have questions, kindly reach out to our support team.
        </h4>

        <div className="flex items-center gap-1">
          <outline.EnvelopeIcon className="h-5 w-5"/>
          <h4 className="text-base font-bold">support@bukah.co</h4>
        </div>

        <div className="flex items-center gap-1">
          <outline.PhoneIcon className="h-5 w-5"/>
          <h4 className="text-base font-bold">+234 808 519 1968</h4>
        </div>

      </div>


    </div>
  )
}