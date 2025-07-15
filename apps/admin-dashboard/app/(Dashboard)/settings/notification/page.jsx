'use client'

import {NotificationSettings} from "../../../components/layout/settingsMainNav";
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settings/settingsHeadingIntro"
import { sections } from "../../../data/notification";

export default function Notification() {

  return (
    <div className="notification_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">
          <NotificationSettings sections={sections}/>
        </div>

      </div>
      

    </div>
  )
}