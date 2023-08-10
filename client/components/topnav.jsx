"use client"
import {BiSolidNotification,BiSolidUserPlus,BiSolidFileImport} from 'react-icons/bi'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Topnav() {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 py-4 justify-end  items-center'>
         <BiSolidNotification size={24}/>
         <p className='text-slate-600 font-bold'>mmr.jew</p>
         <Image src='/cut1.png' alt='profile' width={30} height={30} className='rounded-full'/>
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
