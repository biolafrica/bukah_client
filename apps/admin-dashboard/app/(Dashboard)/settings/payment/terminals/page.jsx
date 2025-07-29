import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";

import TerminalClientinner from "../../../../components/pages/terminals/terminalClientInner";

export default function Terminals(){

  const data= {
    head: "Add New Terminals",
    subHead: "Add and manage your pos terminals",
    button:"Add Terminal",
    link : '/settings/payment/terminals/add'
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
            <BackButton info="Terminals"/>
            <AddSection data={data}/>
            <TerminalClientinner/>
          </div>

        </div>

      </div>

    </div>
    
  )
}