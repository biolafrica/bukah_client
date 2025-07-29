import SettingsNav from "../../../components/layout/settingsNav";
import BillingClientInner from "../../../components/pages/settings/billingClientInner";
import SettingsHeadingIntro from "../../../components/pages/settings/settingsHeadingIntro";

export default function Billing() {
  return (
    <div className="billings_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">

          <div className="border border-border-text rounded-md p-5 bg-white">
            <h3 className="font-semibold text-base border-b border-border-text pb-3 mb-5">Subscription and Billing</h3>
            <h4 className="text-sm text-sec-text">Manage your plan and billing settings</h4>
            <BillingClientInner/>
          </div>
          
        </div>

      </div>

    </div>
  )
}