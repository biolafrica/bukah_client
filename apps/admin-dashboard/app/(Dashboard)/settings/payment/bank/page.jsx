import BankClientInner from "../../../../components/pages/settings/bankClientInner";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";


export default function Bank(){
  return(
    <div className="tax_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Bank Details"/>
            <BankClientInner/>
          </div>

        </div>
      </div>

    </div>
  )
}