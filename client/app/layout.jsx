
import './globals.css'
import SideNavbar from '@/components/sideNavbar'
import Topnav from '@/components/topnav'
import { Roboto } from '@next/font/google'
import ReduxProvider from './provider'

const roboto = Roboto({
  subsets:['latin'],
  weight:'400'
})

export const metadata = {
  title: 'Dite EmployEase',
  description: 'Manage your employees here at ease',
}

export default function RootLayout({
  children,
}) {
  
  
  return (
    <body className={`${roboto.className} w-full flex bg-white`}>
            <SideNavbar />
            <main className='main flex flex-col bg-[rgb(250, 250, 250)] jusify-center'>
              <ReduxProvider>
              <Topnav />
                  {children}
              </ReduxProvider>
            </main>
  
    </body>
  )
}
