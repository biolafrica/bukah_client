"use client"

import {PolicyBody } from "../../../components/layout/settingsMainNav"
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settingsHeadingIntro"

export default function Policy() {
  return (
    <div className="policies_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">
          <PolicyBody/>
        </div>

      </div>

    </div>
  )
}