"use client"
import SettingListCard from "../../../../components/pages/settingListCard";
import BackButton from "../../../../components/common/backButton";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settingsHeadingIntro";
import { AddSection } from "../../../../components/pages/addSettingsItemCard";


export default function POS(){
  const data= {
    head: "Add New POS",
    subHead: "Add and manage your POS machines",
    button:"Add POS",
    link : '/settings/payment/pos/add'
  }
  const listCard =[
    {id : 1, name : "POS 1234", head : "MoniePoint", subHead: "Bukah Africa"},
    {id : 2, name : "POS234", head : "MoniePoint", subHead: "Bukah Africa"},
    {id : 3, name : "POS456", head : "MoniePoint", subHead: "Bukah Africa"}
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
            <BackButton info="POS"/>
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