import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settings/settingsHeadingIntro";
import NotificationClientInner from "../../../components/pages/settings/notificationClientInner";


export default function Notification() {
  return (
    <div className="notification_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <NotificationClientInner/>

      </div>
    </div>
  )
}