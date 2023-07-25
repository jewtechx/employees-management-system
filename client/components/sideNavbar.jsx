import Link from 'next/link'
import {BiSolidDashboard,BiSolidGroup,BiSolidCategory,BiSolidShield,BiSolidNote,BiSolidGrid} from 'react-icons/bi'
export default function SideNavbar() {
  return (
    <div className="sticky top-0 flex flex-col h-[100vh] w-max rounded-tr-lg bg-slate-800">
        <h1 className="text-slate-100 font-bold p-6 spacing-2 text-2xl hidden sm:block">Empmang</h1>

        <div className='mt-10'>
          <ul className='flex flex-col gap-6 text-right'>

            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidDashboard size={22}/>
              <Link href='/' className='hidden sm:block'>Dashboard</Link>
              </li>
              
            </div>  
            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidGroup size={22}/>
              <Link href='/' className='hidden sm:block'>Employees Access</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidCategory size={22}/>
              <Link href='/' className='hidden sm:block'>Categories</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidNote size={22}/>
              <Link href='/' className='hidden sm:block'>Reports/Invoices</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidShield size={22}/>
              <Link href='/' className='hidden sm:block'>Policy</Link>
              </li>
            </div>  


            <div className='w-auto text-left px-6'>
            <li className='
            relative
            sidenav
            text-slate-400
             flex gap-2 
             hover:text-slate-100   
             hover:after:absolute hover:after:left-0 hover:after:w-20 hover:after:bg-slate-100 hover:after:h-auto
             transition duration-2000 ease-in-out'>
              <BiSolidGrid size={22}/>
              <Link href='/' className='hidden sm:block'>Analytics</Link>
              </li>
            </div>  
            


          </ul>
        </div>
    </div>
  )
}
