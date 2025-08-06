"use client"

import * as outline  from "@heroicons/react/24/outline"
import * as solid  from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    key: 'general',
    label: 'General Settings',
    href: '/settings/general',
    outlineIcon: outline.HomeIcon,
    solidIcon: solid.HomeIcon,
  },
  {
    key: 'payment',
    label: 'Payments & Terminals',
    href: '/settings/payment',
    outlineIcon: outline.CreditCardIcon,
    solidIcon: solid.CreditCardIcon,
  },
  {
    key: 'billing',
    label: 'Subscription and Billing',
    href: '/settings/billing',
    outlineIcon: outline.CurrencyDollarIcon,
    solidIcon: solid.CurrencyDollarIcon,
  },
  {
    key: 'Account',
    label: 'Account Settings',
    href: '/settings/account',
    outlineIcon: outline.UserIcon,
    solidIcon: solid.UserIcon,
  },
  {
    key: 'notification',
    label: 'Notifications',
    href: '/settings/notification',
    outlineIcon: outline.BellIcon,
    solidIcon: solid.BellIcon,
  },
  {
    key: 'policy',
    label: 'Policies',
    href: '/settings/policy',
    outlineIcon: outline.BookOpenIcon,
    solidIcon: solid.BookOpenIcon,
  },
];

export default function SettingsNav(props = items, defaultActiveKey = "general") {
  const pathname = usePathname()

  // Determine if any href matches the current pathname
  const isAnyMatched = items.some(item => item.href === pathname)

  return (
    <nav className="flex flex-col gap-3 lg:border lg:border-border-text px-5 py-7 lg:rounded-md text-sm font-medium bg-white rounded-t-2xl h-fit">
      {items.map(({ key, label, href, outlineIcon: OutlineIcon, solidIcon: SolidIcon }) => {
      
        const isActive = isAnyMatched
          ? pathname === href
          : key === defaultActiveKey
        const Icon = isActive ? SolidIcon : OutlineIcon
        const baseClasses = 'rounded-md flex items-center justify-between px-4 py-3 transition-colors'
        const activeClasses = 'bg-pri-cont text-on-pri-cont'
        const inactiveClasses = 'text-on-pri-cont hover:bg-pri-cont'

        return (
          <Link
            key={key}
            href={href}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </div>
            <outline.ChevronRightIcon className="w-5 h-5 lg:hidden" aria-hidden="true" />
          </Link>
        )
      })}
    </nav>
  )
}