import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import PosClientInner from "../../../../components/pages/pos/posClientInner";

export default function POS(){
  const data= {
    head: "Add New POS",
    subHead: "Add and manage your POS machines",
    button:"Add POS",
    link : '/settings/payment/pos/add'
  }

  return(
  
    <div className="tables_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden xl:block">
            <SettingsNav/>
          </div>

          <div className=" w-full xl:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="POS"/>
            <AddSection data={data}/>
            <PosClientInner/>
            
          </div>

        </div>

      </div>

    </div>

  )
}