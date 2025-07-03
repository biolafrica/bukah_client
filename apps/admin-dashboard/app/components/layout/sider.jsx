"use client"

import * as outline from "@heroicons/react/24/outline"
import * as solid from "@heroicons/react/24/solid"
import Link from "next/link";
import { useState } from "react";

export default function Sider(){


  const [active, setActive] = useState("dashboard")

  const handleClick =(value = "dasboard")=>{
    setActive(value)

  }

  return(
    <div className="p-5 border-r-gray-200 border-r w-[276px] h-screen" >

      <div className="flex flex-col gap-1">

        <h4 className="pl-2 text-xs text-gray-400 mb-1">MAIN</h4>

        <Link 
          href="/" 
          className={`sider-item ${active === "dashboard" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("dashboard")}}
        >

          {active === "dashboard" ?<solid.Squares2X2Icon className="w-6 h-6"/>:<outline.Squares2X2Icon className="w-6 h-6"/>}
          <h2 className=" text-gray-900">Dashboard</h2>
        </Link>

        <Link 
          href="/menu"
          className={`sider-item ${active === "menu" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("menu")}}
          
        >
          {active === "menu" ? <solid.ArchiveBoxIcon className="w-5 h-5"/> : <outline.ArchiveBoxIcon className="w-5 h-5"/>}
          <h2>Menu</h2>
        </Link>

        <Link 
          href="/orders" 
          className={`sider-item ${active === "orders" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("orders")}}
         
        >
          {active === "orders" ? <solid.ClipboardIcon className="w-5 h-5"/> : <outline.ClipboardIcon className="w-5 h-5"/>}
          <h2>Orders</h2>
        </Link>

        <Link 
          href="/customers" 
          className={`sider-item ${active === "customers" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("customers")}}
        >
          {active === "customers" ?<solid.UsersIcon className="w-5 h-5"/>:<outline.UsersIcon className="w-5 h-5"/>}
          <h2>Customer</h2>
        </Link>

        <Link 
          href="/employees" 
          className={`sider-item ${active === "employee" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("employee")}}
          
          >
          {active === "employee" ?<solid.UserGroupIcon className="w-5 h-5"/>:<outline.UserGroupIcon className="w-5 h-5"/>}
          <h2>Employee</h2>
        </Link>

        <Link 
          href="/branches" 
          className={`sider-item ${active === "branches" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("branches")}}
        >
          {active === "branches" ?<solid.BuildingStorefrontIcon className="w-5 h-5"/>:<outline.BuildingStorefrontIcon className="w-5 h-5"/>}
          <h2>Branches</h2>
        </Link>

        <Link 
          href="/finance" 
          className={`sider-item ${active === "finance" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("finance")}}
        >
          {active === "finance" ? <solid.WalletIcon className="w-5 h-5"/>:<outline.WalletIcon className="w-5 h-5"/>}
          <h2>Finance</h2>
        </Link>

      </div>

      <div>

        <h4 className="pl-2 text-xs text-gray-400 mb-1 mt-5" >OTHERS</h4>

        <Link 
          href="/help-center" 
          className={`sider-item ${active === "helpCenter" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("helpCenter")}}
        >
          {active === "helpCenter" ?<solid.QuestionMarkCircleIcon className="w-5 h-5"/> :<outline.QuestionMarkCircleIcon className="w-5 h-5"/>}
          <h2>Help Center</h2>
        </Link>

        <Link 
          href="/settings" 
          className={`sider-item ${active === "settings" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("settings")}}
        >
          {active === "settings" ?<solid.Cog6ToothIcon className="w-5 h-5"/>:<outline.Cog6ToothIcon className="w-5 h-5"/>}
          <h2>Settings</h2>
        </Link>

        <Link 
          href="/" 
          className={`sider-item ${active === "logout" ? "sider-item--active"  : "" }`} 
          onClick={ ()=>{handleClick("logout")}}
        >
          {active === "logout" ?<solid.ArrowLeftEndOnRectangleIcon className="w-5 h-5"/>:<outline.ArrowLeftEndOnRectangleIcon className="w-5 h-5"/>}
          <h2>Logout</h2>
        </Link>

      </div>

      <h4 className="text-xs text-gray-400 my-10 text-center">Powered by Bukah Africa</h4>
      
    </div>
  )
}