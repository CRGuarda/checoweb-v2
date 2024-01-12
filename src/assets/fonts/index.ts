import localFont from 'next/font/local'

const pangram_sans = localFont({
  src: [
    { path: './PPPangramSans-Bold.woff2', style: 'normal', weight: '700' },
    { path: './PPPangramSans-Regular.woff2', style: 'normal', weight: '400' },
  ],
  variable: '--font-sans',
})

const palmer_script = localFont({
  src: './PalmerLakeScript-Regular.otf',
  style: 'normal',
  weight: '400',
  variable: '--font-palmer-script',
})

const palmer_print = localFont({
  src: './PalmerLakePrint-Regular.otf',
  style: 'normal',
  weight: '400',
  variable: '--font-palmer-print',
})

export { pangram_sans, palmer_script, palmer_print }
