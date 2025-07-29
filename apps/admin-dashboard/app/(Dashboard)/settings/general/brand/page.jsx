import SettingsNav from "../../../../components/layout/settingsNav"
import BackButton from "../../../../components/common/backButton"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BrandClientInner from "../../../../components/pages/settings/brandClientInner"


export default function Brand(){

  return(
    <div className="brand_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Brand Customization"/>
            <BrandClientInner/>
          </div>

        </div>

      </div>

    </div>

  )
}