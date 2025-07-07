"use client"

import { useState } from "react"

export default function Switch({  
  initial = false,  
  onChange = () => {}  
}) {
  const [on, setOn] = useState(initial)

  const toggle = () => {
    setOn(o => {
      const next = !o
      onChange(next)
      return next
    })
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={toggle}
      className={`
        w-[40px] h-[20px] rounded-full p-[2px]
        flex items-center transition-colors duration-200 ease-in-out
        ${on ? "bg-[#cee8a0]" : "bg-[#eeeef7]"}
        cursor-pointer
      `}
    >
      <div
        className={`
          w-[16px] h-[16px] rounded-full transition-all duration-200 ease-in-out
          ${on ? "bg-on-pri-cont ml-auto" : "bg-[#9090b0] mr-auto"}
        `}
      />
    </button>
  )
}
