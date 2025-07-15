"use client"
import SettingListCard from "../../../../components/pages/settings/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/settings/addSettingsItemCard";
import { formatNaira } from "../../../../utils/format";

export default function Tables(){
  const data= {
    head: "Add New Tables",
    subHead: "Add tables to your restaurant here",
    button:"Add Table",
    link : '/settings/general/tables/add'
  }
  const listCard =[
    {id : 1, name : "Table 1", head : "4 seater - Main Lounge", subHead: `service charge ${formatNaira(500)}`},
    {id : 2, name : "Table 2", head : "2 seater - Main Lounge", subHead: `service charge ${formatNaira(10000)}`},
    {id : 3, name : "Table 3", head : "3 seater - Main Lounge", subHead: `service charge ${formatNaira(2000)}`}
  ]

  const handleDelete = ()=>{}
  const handleEdit = ()=>{}

  return(
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

            <div>
              <SettingListCard data={listCard} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
            
          </div>

        </div>

      </div>

    </div>
  )
}