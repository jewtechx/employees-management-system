import React from 'react'
import {useRouter} from 'next/navigation'
import { ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {BiSolidUserPlus} from 'react-icons/bi'

export default function NoEmployee() {
    const router = useRouter()
  return (
    <div className='w-full h-48 flex flex-col items-center justify-center'>
       <ExclamationTriangleIcon className='text-slate-300'/>
          <h1 className="font-[600] tracking-wide">No Employee Found For This Admin</h1>
          <button onClick={() => router.push('/employee/createEmp')} type='button' className='bg-purple-500 hover:bg-purple-600 cursor-pointer px-8 p-[0.4rem] mt-2 rounded-[0.2rem] text-base-200 text-[12px] font-bold gap-2 flex items-center'>
            <BiSolidUserPlus size={21}/>
            Add
          </button>
    </div>
  )
}
