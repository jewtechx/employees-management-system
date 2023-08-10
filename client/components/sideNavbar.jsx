'use client'
import React from 'react'
import Link from 'next/link'
import {BiSolidDashboard,BiSolidGroup,BiSolidCategory,BiSolidShield,BiSolidNote,BiSolidGrid} from 'react-icons/bi'

import { usePathname } from 'next/navigation'

export default function SideNavbar() {
  const pathname = usePathname()
  
  const linkStyle = {
    color:"white",
    borderLeft:'4px solid white'
  }
  return (
    <div className="sticky top-0 flex flex-col h-[100vh] w-max rounded-tr-lg bg-slate-800">
        <h1 className="text-slate-100 font-bold p-6 spacing-2 text-lg hidden sm:block">EmployEase</h1>

        <div className='mt-10'>
          <ul className='flex flex-col gap-6 text-right'>

            <div className='w-auto text-left px-6 ' style={pathname == '/' ? linkStyle : {}}>
            <li className='sidenav-links duration-2000' style={pathname == '/' ? {color:'#f3f3f3'} : {}}>
              <BiSolidDashboard size={22}/>
              <Link href='/' className='hidden sm:block' >Dashboard</Link>
              </li>
              
            </div>  
            <div className='w-auto text-left px-6'>
            <li className='sidenav-links duration-2000'>
              <BiSolidGroup size={22}/>
              <Link href='/' className='hidden sm:block'>Employees Access</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='sidenav-links duration-2000'>
              <BiSolidCategory size={22}/>
              <Link href='/' className='hidden sm:block'>Categories</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='sidenav-links duration-2000'>
              <BiSolidNote size={22}/>
              <Link href='/' className='hidden sm:block'>Reports/Invoices</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='sidenav-links duration-2000'>
              <BiSolidShield size={22}/>
              <Link href='/' className='hidden sm:block'>Policy</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='sidenav-links duration-2000'>
              <BiSolidGrid size={22}/>
              <Link href='/' className='hidden sm:block'>Analytics</Link>
              </li>
            </div>  
            


          </ul>
        </div>
    </div>
  )
}
