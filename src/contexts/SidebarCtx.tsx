"use client"

import { SideBarContext } from "@/types/contexts";
import { createContext, ReactNode, useContext, useState } from "react";

const sidebarCtx = createContext<SideBarContext>({
    sidebarOpen: false,
    toggleSidebar: () => {}
});

export const SidebarCtx = ({ children } : { children: ReactNode }) => {

  const [ isSidebarOpen, setSidebarOpen ] = useState(false)

  return (
    <sidebarCtx.Provider value={{
      sidebarOpen: isSidebarOpen,
      toggleSidebar: setSidebarOpen
    }}>
      {children}
    </sidebarCtx.Provider>
  )
}

export const useSidebarCtx = () => {
  const { sidebarOpen, toggleSidebar } = useContext(sidebarCtx)

  return { sidebarOpen, toggleSidebar };
}
