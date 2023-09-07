"use client"
import { useEffect } from 'react'
import { BiSolidSearch, BiSolidFilterAlt, BiSolidFileExport } from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux'
import { filterEmployee, setBackendFilterValue } from '../redux/employees/employees.reducer'
import { setFilterValue } from '../redux/employees/employees.reducer'

export default function FilterTable() {
  //getting wildcards
  const dispatch = useDispatch()
  function getFilterValue(value){
      dispatch(setFilterValue(value))
     }

     
  function filterByButton(filterCondition) {
       
    window.localStorage.setItem('filterFromBackend',JSON.stringify(filterCondition))
    const lsCondition =  window.localStorage.getItem('filterFromBackend')
    var condition = JSON.parse(lsCondition)
    dispatch(setBackendFilterValue(condition))
    
    if (lsCondition) {
      dispatch(filterEmployee(condition))
    }
  }

 //getting filter name
   const condition = useSelector((state) => state.employees.backendFilterCondition)
 

  return (
    <div className="">
      <div className="flex gap-2 items-center filter-input justify-between mt-2 flex-wrap">
        <div className="flex gap-2">
            <div className="flex items-center">
                <BiSolidSearch className="p-1 border border-slate-100 rounded-md w-[34px] h-[30px] text-slate-200"/>
                <input onChange={(e) => getFilterValue(e.target.value)} type="text" placeholder="Search by name,email,id..." className='p-2 border border-slate-100 rounded-md outline-slate-100 text-slate-500'/>
            </div>

          <div className="dropdown dropdown-top">
            <button tabIndex={0} className="border border-slate-100 rounded-md p-1 text-slate-400 flex gap-1 items-center"><BiSolidFilterAlt className='text-slate-200 w-[25px] h-[20px]'/>{condition ? condition : 'Filter'}</button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu text-slate-700 p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={() => filterByButton('order by first_name')}><a>Order By Names (ASC)</a></li>
              <li onClick={() => filterByButton('order by first_name desc')}><a>Order By Names (DESC)</a></li>
              <li onClick={() => filterByButton('order by start_date')}><a>Order By Date (ASC)</a></li>
              <li onClick={() => filterByButton('order by start_date desc')}><a>Order By Date in (DESC)</a></li>
            </ul>
          </div>
        </div>

        
        <button className="border border-slate-100 rounded-md p-2 text-slate-400 flex gap-1 items-center"><BiSolidFileExport className='text-slate-200 w-[25px] h-[20px]'/> Export</button>
        
      </div>
    </div>
  )
}
