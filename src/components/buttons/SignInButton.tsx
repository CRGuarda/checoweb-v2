'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { GoogleIcon } from '@/components/icons/Icons'
import { useState } from 'react'

export const SignInButton = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl })
  }
  return (
    <button
      onClick={handleSignIn}
      className='rounded-md px-2 text-xl md:text-lg text-center w-fit h-fit mt-4 flex gap-2 items-center p-1 bg-accent-lilac disabled:pointer-events-none disabled:bg-gray-300 disabled:text-white group'
      disabled={isLoading}
    >
      <GoogleIcon className='w-8 group-disabled:grayscale' />
      <span>Sign in with Google</span>
    </button>
  )
}
