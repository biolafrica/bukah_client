"use client"

import Header from "../components/layout/header";
import Sider from "../components/layout/sider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AIAgent from "../components/common/aiAgent";
import NotificationAlert from "../components/common/notification";

const queryClient = new QueryClient()

export default function DashboardLayout({children}){

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const toggleNotificationPanel = () => setNotificationOpen(prev => !prev)
  const toggleAIAgentPanel = () => setAiOpen(prev => !prev)


  return(
    <div className="flex flex-col">
      <Header 
        onMenuClick={() => setSidebarOpen(prev => !prev)} 
        toggleAIAgentPanel= {toggleAIAgentPanel} 
        toggleNotificationPanel={toggleNotificationPanel} 
      />
      
      <div className="flex ">
        
        <aside className="hidden lg:block">
          <Sider/> 
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={()=> setSidebarOpen(false)}
            />

            <div className="relative z-40">
              <Sider/>
            </div>

          </div>
        )}

        {aiOpen && (
          <div className="fixed top-[88px] right-0 h-[calc(100vh-88px)] w-full lg:w-1/2 z-50 bg-white border-l border-gray-200 shadow-lg">
            <AIAgent onClose={toggleAIAgentPanel} />
          </div>
        )}

        {notificationOpen && (
          <div className="absolute top-[88px] right-4 z-50">
            <NotificationAlert onClose={toggleNotificationPanel} />
          </div>
        )}

        <main className="flex-1 w-full">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </main>

      </div>
  
    </div>
  )
}