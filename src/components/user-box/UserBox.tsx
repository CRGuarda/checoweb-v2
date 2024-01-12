'use client'
import { signOut, useSession } from 'next-auth/react'
import { SignOutIcon } from '@/components/icons/Icons'
import Image from 'next/image'

export const UserBox = () => {
  const { data: session } = useSession()
  return (
    <>
      {session && (
        <div className='flex col-start-3 justify-end items-center gap-2 text-white'>
          <div className='aspect-square w-7 md:w-9'>
            <Image
              src={session?.user?.image as string}
              alt='Profile image'
              width={400}
              height={400}
              className='rounded-full'
            />
          </div>
          <h2 className='font-bold mt-1 hidden md:block'>{session?.user?.name}</h2>
          <button onClick={() => signOut()} title='Sign out '>
            <SignOutIcon className='w-5 h-5' />
          </button>
        </div>
      )}
    </>
  )
}
