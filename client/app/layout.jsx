import './globals.css'
import SideNavbar from '@/components/sideNavbar'
import Topnav from '@/components/topnav'
import Head from 'next/head'

export const metadata = {
  title: 'Empmang',
  description: 'Manage your work here at ease',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
       </Head>
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
