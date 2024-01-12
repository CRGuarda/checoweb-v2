import { NextAuthProvider } from '@/components/contexts/NextAuthProvider'
import { Navbar } from '@/components/navbar/Navbar'
import SidebarProvider from '@/components/contexts/SidebarProvider'
import { Sidebar } from '@/components/sidebar/Sidebar'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <SidebarProvider>
        <Navbar />
        <section className='md:grid md:grid-cols-[300px,1fr] md:gap-4 h-full pt-12 md:pt-14'>
          <Sidebar />
          <section className='px-3 md:overflow-y-auto h-full md:h-auto pt-8'>{children}</section>
        </section>
      </SidebarProvider>
    </NextAuthProvider>
  )
}
