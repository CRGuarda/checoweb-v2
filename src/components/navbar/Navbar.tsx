'use client'
import Image from 'next/image'
import logo from '@/assets/img/Kambia logo primario negativo.png'
import { HamburgerIcon } from '@/components/icons/Icons'
import { useSidebarContext } from '@/components/contexts/SidebarProvider'
import { UserBox } from '@/components/user-box/UserBox'
import Link from 'next/link'

export const Navbar = () => {
  const { toggleOpen } = useSidebarContext()
  return (
    <nav className='h-12 w-full bg-primary grid justify-between items-center px-2 md:px-4 grid-cols-3 absolute top-0 md:h-14 z-50'>
      <button className='text-left md:hidden w-fit' onClick={() => toggleOpen()}>
        <HamburgerIcon className='text-white h-6 w-6' />
      </button>
      <div className='col-start-2 items-center flex justify-center w-full h-full'>
        <Link href='/'>
          <Image className='w-24 md:w-28' src={logo} alt='Business logo' priority />
        </Link>
      </div>
      <UserBox />
    </nav>
  )
}
