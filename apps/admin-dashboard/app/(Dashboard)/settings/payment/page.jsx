"use client"

import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settingsHeadingIntro"

export default function Payment() {
  return (
    <div className="payment_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>
      <SettingsNav/>

    </div>
  )
}