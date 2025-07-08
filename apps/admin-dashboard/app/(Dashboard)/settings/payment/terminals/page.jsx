"use client"
import SettingListCard from "../../../../components/pages/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/addSettingsItemCard";
import { formatNaira } from "../../../../utils/format";

export default function Terminals(){
  const data= {
    head: "Add New Terminals",
    subHead: "Add and manage your pos terminals",
    button:"Add Terminal",
    link : '/settings/payment/terminals/add'
  }
  const listCard =[
    {id : 1, name : "Terminal1234", head : "Branch B", subHead: 'POS1234'},
    {id : 2, name : "Terminal4321", head : "Branch C", subHead: "POS4321"},
    {id : 3, name : "Terminal54678", head : "Branch A", subHead: "POS5432"}
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
            <BackButton info="Terminals"/>
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