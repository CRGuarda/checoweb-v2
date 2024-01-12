'use client'

import { useEffect } from 'react'
import { useSidebarContext } from '@/components/contexts/SidebarProvider'
import { SidebarMapper } from '@/components/sidebar/SidebarMapper'

export const Sidebar = () => {
  const { isSidebarOpen, toggleOpen } = useSidebarContext()

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto'
  }, [isSidebarOpen])

  return (
    <>
      <aside
        className={`px-4 py-10 h-screen fixed z-20 bg-accent-lilac md:!sticky md:h-full md:w-full top-12 md:top-14 md:block ${
          isSidebarOpen ? 'block w-64' : 'hidden'
        }`}
      >
        <SidebarMapper />
      </aside>
      <div
        className={`w-screen h-screen bg-black md:hidden bg-opacity-55 fixed ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => toggleOpen()}
      ></div>
    </>
  )
}
