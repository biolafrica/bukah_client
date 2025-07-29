import SettingsNav from "../../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import StoreClientInner from "../../../../components/pages/settings/storeClientInner"


export default function Store(){
  return(
    <div className="store_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Store Info"/>
            <StoreClientInner/>
          </div>

        </div>

      </div>


    </div>
  )
}
