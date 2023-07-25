import {BiSolidNotification,BiSolidUserPlus,BiSolidFileImport} from 'react-icons/bi'
import Image from 'next/image'
export default function Topnav() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 py-4 justify-end  items-center'>
         <BiSolidNotification size={24}/>
         <p className='text-slate-700 font-[500]'>Jew Larbi Danquah</p>
         <Image src='/cut1.png' alt='profile' width={30} height={30} className='rounded-full'/>
      </div>


      <div className='flex justify-center sm:justify-between items-center flex-wrap'>
        <div className='text-lg font-[400] tracking-1 flex items-end px-4 gap-6'>
          <p className='text-slate-400'>Admin</p>
          <p className='text-slate-400'>&gt;</p>
          <p className='text-slate-700'>Employees</p>
        </div>


        <div className='flex items-center gap-4'>
          <button type='button' className='bg-slate-800 p-1 rounded-md text-slate-100/80 text-[13px] font-[500] gap-2 px-2 flex'>
            <BiSolidUserPlus size={24}/>
            Users
          </button>

          <button type='button' className='bg-slate-800 p-1 rounded-md text-slate-100/80 text-[13px] font-[500] gap-2 px-2 flex'>
             <BiSolidFileImport size={24}/>
             Import
            </button>
        </div>
      </div>
    </div>
  )
}
