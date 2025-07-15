import { createContext } from "react";

const OptionsContext = createContext({
  branchOptions:   [],
  categoryOptions: [],
  singleItemOptions: [],
})

export function OptionProvider({branchOptions, categoryOptions, singleItemOptions, children }){
  return(
    <OptionsContext.Provider value={{branchOptions, categoryOptions, singleItemOptions}}>
      {children}
    </OptionsContext.Provider>
  )
}

export function useOptions() {
  return useContext(OptionsContext)
}