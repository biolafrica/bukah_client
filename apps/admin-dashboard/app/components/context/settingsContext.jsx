"use client"

import { createContext, useContext } from "react"


const SettingsContext = createContext({
  branchOptions :[],
  settings: {}
});

export function SettingsProvider({branchOptions, settings,children}){
  return(
    <SettingsContext.Provider value={{branchOptions, settings, children}}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(){
  return useContext(SettingsContext)
}