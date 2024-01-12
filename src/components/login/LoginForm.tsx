import Image from 'next/image'
import fullLogo from '@/assets/img/Kambia logotipo positivo.png'
import backgroundImage from '@/assets/img/Kambia ilustracion.png'
import { SignInButton } from '@/components/buttons/SignInButton'

export const LoginForm = () => {
  return (
    <section className='w-full h-screen text-center flex flex-col items-center justify-between'>
      <div className='flex flex-col md:flex-row pt-20 md:gap-10 items-center w-fit h-fit gap-8'>
        <Image src={fullLogo} alt={'Logotipo Kambia'} priority className='w-[300px] h-auto md:w-[550px] px-4' />
        <SignInButton />
      </div>
      <Image
        src={backgroundImage}
        alt={'Background image'}
        className='2xl:w-[550px] h-auto w-[500px] pb-32 md:pb-24'
        priority
      />
    </section>
  )
}
