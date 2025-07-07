'use client'

import { SettingsSectionNav } from "../../../components/layout/settingsMainNav";
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settingsHeadingIntro"

export default function General() {
  const generalItems = [
    { key: 'store',   href: '/settings/payment/bank',   label: 'Store Info',     description: 'Edit your business name, email, etc.' },
    { key: 'hours',  href: '/settings/payment/hours',  label: 'Business Hours',   description: 'Manage your opening hours' },
    { key: 'brand',  href: '/settings/payment/brand',  label: 'Brand Customization', description: 'Edit your brand logo and colors' },
    { key: 'tables', href: '/settings/payment/tables', label: 'Table Management',  description: 'Manage tables & service charges' },
    { key: 'tax',    href: '/settings/payment/tax',    label: 'Tax',              description: 'Set your tax percentage' },
  ];
  return (
    <div className="general_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">
          <SettingsSectionNav
            title="General Settings"
            items={generalItems}
          />
        </div>

      </div>
    </div>
  )
}