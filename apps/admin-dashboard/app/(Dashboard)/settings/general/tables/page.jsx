import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import TableClientInner from "../../../../components/pages/table/tableClientInner";

export default function Tables(){
  const data= {
    head: "Add New Tables",
    subHead: "Add tables to your restaurant here",
    button:"Add Table",
    link : '/settings/general/tables/add'
  }

  return(
    <>
     
      <div className="tables_cont p-5 pt-30 lg:pl-75">

        <SettingsHeadingIntro/>

        <div className="border border-border-text rounded-md p-5 bg-white">

          <div className="flex gap-5">

            <div className="min-w-[270px] w-1/4 hidden xl:block">
              <SettingsNav/>
            </div>

            <div className=" w-full xl:w-3/4 border p-5 rounded-md border-border-text">
              <BackButton info="Table Management"/>
              <AddSection data={data}/>

             <TableClientInner/>
              
            </div>

          </div>

        </div>

      </div>
    </>
  )
}