import './globals.css'
import SideNavbar from '@/components/sideNavbar'
import Topnav from '@/components/topnav'
export const metadata = {
  title: 'Empmang',
  description: 'Manage your work here at ease',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className='w-full flex bg-white'>
        <SideNavbar />
        <main className='main flex flex-col bg-yellow-100/10 jusify-center'>
          <Topnav />
        {children}
        </main>
        </body>
    </html>
  )
}
