import * as outline from "@heroicons/react/24/outline"

export default function HeadingIntro({module, moduleIntro, Icon, buttonText, branches, onButtonClick }){
  return(
    <div> 
      <div className="flex items-center justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl text-gray-800 mb-2">{module}</h1>

            {branches &&   
              <button className="btn btn-tonal" >
                <h4>All Branches</h4>
                <outline.ChevronDownIcon className="w-5 h-5"/>
              </button>
            }

          </div>
          <h4 className="hidden lg:block text-sm text-gray-400 font-light">{moduleIntro}</h4>
        </div>

        <div>
          <button className="btn btn-filled" onClick={onButtonClick}>
            <Icon className="w-5 h-5 font-bold "/>
            <h4>{buttonText}</h4>
          </button>
        </div>

      </div>
    </div>
  )
}