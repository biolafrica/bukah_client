'use client'

import { SettingsSectionNav } from "../../components/layout/settingsMainNav";
import SettingsNav from "../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../components/pages/settings/settingsHeadingIntro";

export default function Settings() {
  const generalItems = [
    { key: 'store',   href: '/settings/general/store',   label: 'Store Info',     description: 'Edit your business name, email, etc.' },
    { key: 'hours',  href: '/settings/general/hours',  label: 'Business Hours',   description: 'Manage your opening hours' },
    { key: 'brand',  href: '/settings/general/brand',  label: 'Brand Customization', description: 'Edit your brand logo and colors' },
    { key: 'tables', href: '/settings/general/tables', label: 'Table Management',  description: 'Manage tables & service charges' },
    { key: 'tax',    href: '/settings/general/tax',    label: 'Tax',              description: 'Set your tax percentage' },
  ];

  return (
    <div className="settings_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-full lg:w-1/4 ">
          <SettingsNav/>
        </div>

        <div className="w-3/4 hidden lg:block">
          <SettingsSectionNav
            title="General Settings"
            items={generalItems}
          />
        </div>

      </div>

      
    </div>
  )
}