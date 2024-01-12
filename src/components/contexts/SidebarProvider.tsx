'use client'

import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleOpen: () => {},
})

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(`SidebarContext components cannot be rendered outside the SidebarContext`)
  }
  return context
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleOpen = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }
  return <SidebarContext.Provider value={{ isSidebarOpen, toggleOpen }}>{children}</SidebarContext.Provider>
}
export default SidebarProvider
