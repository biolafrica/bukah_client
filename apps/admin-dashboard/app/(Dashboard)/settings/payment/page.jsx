"use client"

import { SettingsSectionNav } from "../../../components/layout/settingsMainNav"
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settingsHeadingIntro"

export default function Payment() {
   
  const paymentItems = [
    { key: 'bank', href: '/settings/payment/bank', label: 'Bank Details',description: 'Add and manage your bank details' },
    { key: 'gateway', href: '/settings/payment/gateway', label: 'Payment Gateway',description: 'Add and manage your payment gateway details' },
    { key: 'pos',  href: '/settings/payment/pos', label: 'POS',description: 'Add and manage the POS machine in your store'},
    { key: 'terminal', href: '/settings/payment/terminals', label: 'Terminals',description: 'Add and manage the terminals in your store'},
  ];
  return (
    <div className="payment_cont p-5 pt-30 lg:pl-75">
      <SettingsHeadingIntro/>

      <div className="flex gap-5">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsNav/>
        </div>

        <div className=" w-full lg:w-3/4">
          <SettingsSectionNav
            title="Payment & Terminals"
            items={paymentItems}
          />
        </div>

      </div>

    </div>
  )
}