
import { SettingsSectionNav } from "../../../components/layout/settingsMainNav";
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settings/settingsHeadingIntro"

export default function Account() {

  const generalItems = [
    { key: 'profile',   href: '/settings/account/profile',   label: 'Edit Profile',     description: 'Manage and update your user profile settings' },
    { key: 'password',  href: '/settings/account/password',  label: 'Change Password',   description: 'Update and secure your password settings' },
  ]

  return (
    <div className="general_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">
          <SettingsSectionNav
            title="Account Settings"
            items={generalItems}
          />
        </div>

      </div>

    </div>
  )
}