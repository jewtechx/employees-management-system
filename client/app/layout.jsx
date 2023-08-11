import './globals.css'
import SideNavbar from '@/components/sideNavbar'
import Topnav from '@/components/topnav'
import Head from 'next/head'
import { Roboto} from '@next/font/google'

const roboto = Roboto({
  subsets:['latin'],
  weight:'400'
})

export const metadata = {
  title: 'EmployEase',
  description: 'Manage your employees here at ease',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={roboto.className}>
      <>
      <body className='w-full flex bg-white'>
        <SideNavbar />
        <main className='main flex flex-col bg-[rgb(250, 250, 250)] jusify-center'>
          <Topnav />
        {children}
        </main>
        </body>
      </>
    </html>
  )
}
