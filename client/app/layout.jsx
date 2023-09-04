"use client"
import { useEffect, useState } from 'react';
import './globals.css';
import SideNavbar from '@/components/sideNavbar';
import Topnav from '@/components/topnav';
import Head from 'next/head';
import { Roboto } from '@next/font/google';
import ReduxProvider from './provider';
import Login from '../components/auth/login';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

// export const metadata = {
//   title: 'EmployEase',
//   description: 'Manage your employees here at ease',
// };

export default function RootLayout({
  children,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <title>EmployEase</title>
      </Head>
      <>
      <ReduxProvider>
        {!user || user === null || user === undefined ? (
                <Login />
              ) : (
        <body className='w-full flex bg-white'>
                <>
                  <SideNavbar />
                  <main className='main flex flex-col bg-[rgb(250, 250, 250)] justify-center'>
                    <Topnav />
                    {children}
                  </main>
                </>
      </body> 
        )}
          </ReduxProvider>
      </>
    </html>
  );
}
