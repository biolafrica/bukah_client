"use client"

import { CheckIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon, CreditCardIcon, XMarkIcon,} from "@heroicons/react/24/solid";
import { useState } from "react";

const NOTIFICATIONS = [
  {
    id: 1,
    icon: "payment",
    text: "Your Payment was successfully processed and is now complete",
    date: "06 June, 2025",
    read: true,
  },
  {
    id: 2,
    icon: "payment",
    text: "Your Payment was successfully processed and is now complete",
    date: "06 June, 2025",
    read: false,
  },
  {
    id: 3,
    icon: "warning",
    text: "Your subscription ends in 5 days",
    date: "07 June, 2025",
    read: false,
  },
  {
    id: 4,
    icon: "warning",
    text: "Your subscription ends in 5 days",
    date: "07 June, 2025",
    read: false,
  },
]

export default function NotificationAlert({onClose}){
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState("all") 

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter(n => !n.read)

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return(
    <div className="w-[400px] h-[600px] rounded-lg border border-border-text text-sm bg-white shadow-xl overflow-hidden flex flex-col">

      <div className="sticky top-0 z-10 bg-white border-b border-border-text">

        <div className="flex items-center justify-between p-2">
          <h4 className="p-3 text-base font-semibold">All Notifications</h4>
          <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>
       
        <div className="px-3 pb-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`py-1 px-3 rounded-md transition ${
                filter === "all"
                  ? "bg-[#E2E6E9]"
                  : "text-sec-text hover:text-gray-900"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`py-1 px-3 rounded-md transition ${
                filter === "unread"
                  ? "bg-[#E2E6E9]"
                  : "text-sec-text hover:text-gray-900"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <button
            onClick={markAllAsRead}
            className="text-green-600 font-sans flex items-center gap-1 hover:underline"
          >
            Mark all as read
            <CheckIcon className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {filteredNotifications.map(n => (
          <div
            key={n.id}
            className={`rounded-xl flex items-center gap-3 p-3 ${
              n.read ? "bg-[#F4F7F9]" : ""
            }`}
          >
            <div
              className={`rounded-full h-[40px] w-[40px] flex items-center justify-center ${
                n.icon === "warning" ? "bg-[#FFE5C7]" : "bg-[#E2E6E9]"
              }`}
            >
              {n.icon === "warning" ? (
                <ExclamationTriangleIcon className="w-6 h-6 text-[#E3800B]" />
              ) : (
                <CreditCardIcon className="w-6 h-6 text-[#1C274C]" />
              )}
            </div>

            <div className="w-5/6">
              <p>{n.text}</p>
              <h4 className="text-xs text-sec-text">{n.date}</h4>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <p className="text-center text-sec-text mt-10">No notifications to show</p>
        )}
      </div>

    </div>
  )
}