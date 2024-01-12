import type { Metadata } from 'next'
import { palmer_print, palmer_script, pangram_sans } from '@/assets/fonts'
import './main.css'

export const metadata: Metadata = {
  title: 'ChecoWeb',
  robots: {
    index: false,
    follow: false,
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='es' className={`${palmer_print.variable} ${palmer_script.variable} ${pangram_sans.variable}`}>
      <body className='h-screen overflow-y-auto md:overflow-y-hidden'>{children}</body>
    </html>
  )
}
export default RootLayout
