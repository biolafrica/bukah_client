"use client"

import Header from "../components/layout/header";
import Sider from "../components/layout/sider";
import { useState } from "react";

export default function DashboardLayout({children}){

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return(
    <div className="flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(prev => !prev)}/>
      
     
      <div className="flex ">
        <aside className="hidden lg:block">
          <Sider/> 
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-30 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={()=> setSidebarOpen(false)}
            />

            <div className="relative z-40">
              <Sider/>
            </div>

          </div>
        )}
     
        
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
  
    </div>
  )
}