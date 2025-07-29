
import BackButton from "../../../../../components/common/backButton";
import SettingsNav from "../../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../../components/pages/settings/settingsHeadingIntro";
import AddTableClientInner from "../../../../../components/pages/table/addTableClientInner";


export default function AddTables({data}){
  return(
    <div className="tables_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info={`${ data? "Edit table" : 'Add table'}`}/>

            <AddTableClientInner data={data}/>

          </div>

        </div>
      </div>

    </div>

  )
}