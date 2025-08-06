import * as outline from "@heroicons/react/24/outline"
import * as solid from "@heroicons/react/24/solid"
import Link from "next/link";

export default function Header({onMenuClick, toggleAIAgentPanel, toggleNotificationPanel}){
  return(
    <header className="border-b border-gray-100 fixed top-0 inset-x-0 z-60 bg-white">

      <div className="flex items-center py-6 ">

        <Link 
          href="/" 
          className="hidden lg:flex  w-[276px]items-center gap-1 px-20"
          aria-label="Home"
        >
          <solid.CircleStackIcon className="w-6 h-6"/>
          <h1 className="text-2xl font-bold leading-none">BUKAH</h1>
        </Link>

        <button aria-label="Open menu" className="lg:hidden px-4" onClick={onMenuClick}>
          <outline.Bars3Icon className="w-6 h-6"/>
        </button>

        <div className="flex flex-1 px-4 items-center gap-1" > 
          <outline.MagnifyingGlassIcon className="w-6 h-6"/>
          <input 
            type="text" 
            placeholder="Search for items, orders..."
            className="input-search flex-1 border-none bg-gra" 
            aria-label="Search"
          />

        </div>

        <div className="flex items-center gap-3 px-4 ">

          <button onClick={toggleNotificationPanel}>
            <solid.BellIcon 
              className="w-6 h-6 transition-transform cursor-pointer duration-300 hover:-rotate-5"
            />
          </button>

          <button onClick={toggleAIAgentPanel} className="relative group">
            <solid.UserIcon 
              className="hidden lg:block w-6 h-6 transition-transform cursor-pointer duration-300 group-hover:-rotate-5 text-on-pri-cont"
            />
          </button>

        </div>

        <div className="flex items-center gap-2 pr-4">
          <Link
            className="flex w-10 h-10 items-center justify-center rounded-full bg-green-100 text-base font-bold cursor-pointer"
            aria-label="User initials"
            href='/settings/account/profile'
          >
            DB
          </Link>

          <div className="hidden lg:flex flex-col leading-snug">
            <span className="text-gray-900 text-sm font-normal ">Deji Badamosi</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
          
        </div>
        
      </div>

    </header>
  )
}