"use client"

import SettingsNav from "../../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../../components/pages/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"
import { initial } from "../../../../data/formFields"
import WeeklySchedule from "../../../../components/pages/businessHourTable"

export default function Hours(){
  function handleSave(updatedSchedules) {
    console.log('Saving schedules:', updatedSchedules)
    // send to backend
  }
  return(
    <div className="hours_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Business Hours"/>
         
            <WeeklySchedule
              initialSchedules={initial}
              onSave={handleSave}
            />

          </div>

        </div>

        
       

      </div>

    </div>
  )
}