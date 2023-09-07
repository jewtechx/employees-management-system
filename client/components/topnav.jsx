"use client"
import { useEffect } from 'react'
import {BiSolidNotification,BiSolidUserPlus,BiSolidFileImport,BiSolidLogOut} from 'react-icons/bi'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Topnav() {
  const router = useRouter();

    var name, email
    const userDataString = localStorage.getItem("user");
if (userDataString) {
    const userData = JSON.parse(userDataString);
    email = userData.email;
     name = userData.name;
} else {
    console.log("User data not found in localStorage.");
}
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 py-4 justify-end  items-center'>
         <BiSolidNotification size={24}/>
         <p className='text-slate-600 font-bold'>{name}</p>
         {/* <Image src='/cut1.png' alt='profile' width={30} height={30} className='rounded-full'/> */}
         
         <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        </span>
        
        <button onClick={() => { localStorage.removeItem("user"); window.location.href = '/auth/login'; }} type='button' className='bg-slate-900 hover:bg-neutral-focus cursor-pointer p-[0.3rem] rounded-[0.2rem] text-base-200 text-[12px] font-bold gap-2 px-2 flex items-center'>
            <BiSolidLogOut size={21}/>
            Log Out
          </button>
      </div>


      <div className='flex justify-center sm:justify-between items-center flex-wrap'>
        <div className='text-md font-normal flex items-end px-4 gap-6'>
          <p className='text-slate-400'>Admin</p>
          <p className='text-slate-400'>&gt;</p>
          <p className='text-slate-600'>Employees</p>
        </div>


        <div className='flex items-center gap-4'>
          <button onClick={() => router.push('/employee/createEmp')} type='button' className='bg-slate-900 hover:bg-neutral-focus cursor-pointer p-[0.3rem] rounded-[0.2rem] text-base-200 text-[12px] font-bold gap-2 px-2 flex items-center'>
            <BiSolidUserPlus size={21}/>
            Add
          </button>

          <button type='button' className='bg-slate-900 hover:bg-neutral-focus cursor-pointer p-[0.3rem] rounded-[0.2rem] text-base-200 text-[12px] font-bold gap-2 px-2 flex items-center'>
             <BiSolidFileImport size={21}/>
             Import
            </button>
        </div>
      </div>
    </div>
  )
}
