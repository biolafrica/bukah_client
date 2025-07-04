"use client"
 
import * as outline from "@heroicons/react/24/outline"
import * as solid  from "@heroicons/react/24/solid"
import Link       from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const SECTIONS = [{
  title: "MAIN",
  items: [
    { key: "dashboard", label:"Dashboard", href: "/", icon: outline.Squares2X2Icon, activeIcon: solid.Squares2X2Icon},
    { key: "menu", label: "Menu", href: "/menu", icon: outline.ArchiveBoxIcon, activeIcon:  solid.ArchiveBoxIcon},
    { key: "orders", label: "Orders", href: "/orders", icon: outline.ClipboardIcon, activeIcon: solid.ClipboardIcon},
    { key: "customers", label: "Customer", href: "/customers", icon: outline.UsersIcon, activeIcon: solid.UsersIcon},
    { key: "employee", label: "Employee", href: "/employees", icon: outline.UserGroupIcon, activeIcon: solid.UserGroupIcon},
    { key: "branches", label: "Branches", href: "/branches", icon: outline.BuildingStorefrontIcon,activeIcon: solid.BuildingStorefrontIcon},
    { key: "finance", label: "Finance", href: "/finance", icon: outline.WalletIcon, activeIcon: solid.WalletIcon},
  ]
},{
    title: "OTHERS",
    items: [
      { key: "helpCenter", label:"Help Center", href:"/help-center",icon: outline.QuestionMarkCircleIcon,activeIcon:solid.QuestionMarkCircleIcon,},
      {key: "settings",label: "Settings",href: "/settings", icon: outline.Cog6ToothIcon, activeIcon: solid.Cog6ToothIcon },
      { key: "logout", label: "Logout", href: "/", icon: outline.ArrowLeftEndOnRectangleIcon,activeIcon: solid.ArrowLeftEndOnRectangleIcon},
    ]
  },
]

export default function Sider() {
  const pathname = usePathname()
  const defaultKey = SECTIONS.flatMap(s => s.items).find(i => i.href === pathname)?.key
  const [active, setActive] = useState(defaultKey || "dashboard")

  useEffect(() => {
    if (defaultKey && defaultKey !== active) {
      setActive(defaultKey)
    }
  }, [defaultKey])

  return (
    <aside className="fixed left-0 h-screen w-[276px] bg-white z-20 py-6 pt-30">
      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="px-5 mb-6 last:mb-0">
          <h4 className="pl-2 mb-1 text-xs text-gray-400">{title}</h4>
          <nav className="flex flex-col gap-1">
            {items.map(({ key, label, href, icon: OutlineIcon, activeIcon: SolidIcon }) => {
              const isActive = active === key
              return (
                <Link
                  key={key}
                  href={href}
                  className={`sider-item ${isActive ? "sider-item--active" : ""}`}
                  onClick={() => setActive(key)}
                >
                  {isActive
                    ? <SolidIcon className="w-5 h-5" />
                    : <OutlineIcon className="w-5 h-5" />
                  }
                  <h2 className="text-gray-900">{label}</h2>
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
      <div className="px-5 mt-auto">
        <h4 className="text-xs text-gray-400 my-10 text-center">Powered by Bukah Africa</h4>
      </div>
    </aside>
  )
}