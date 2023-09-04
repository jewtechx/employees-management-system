import {BiSolidSearch, BiSolidFilterAlt,BiSolidFileExport} from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { filterEmployee } from '../redux/employees/employees.reducer'

export default function FilterTable() {
  // //getting wildcards
  //  function getFilterValue(value){
  //    props.filterValue(value.toLowerCase())
  // }

  function filterByButton(condition){
    const dispatch = useDispatch()
    dispatch(filterEmployee(condition))
  }
  return (
    <div className="">
      <div className="flex gap-2 items-center filter-input justify-between mt-2 flex-wrap">
        <div className="flex gap-2">
            <div className="flex items-center">
                <BiSolidSearch className="p-1 border border-slate-100 rounded-md w-[34px] h-[30px] text-slate-200"/>
                <input onChange={(e) => getFilterValue(e.target.value)} type="text" placeholder="Search by name,email,id..." className='p-2 border border-slate-100 rounded-md outline-slate-100 text-slate-500'/>
            </div>

          <div className="dropdown dropdown-top">
            <button tabIndex={0} className="border border-slate-100 rounded-md p-1 text-slate-400 flex gap-1 items-center"><BiSolidFilterAlt className='text-slate-200 w-[25px] h-[20px]'/> Filter</button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu text-slate-700 p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={() => filterByButton('order by first_name')}><a>Order By Names (ASC)</a></li>
              <li onClick={() => filterByButton('order by first_name desc')}><a>Order By Names (DSC)</a></li>
              <li onClick={() => filterByButton('order by start_date')}><a>Order By Date (ASC)</a></li>
              <li onClick={() => filterByButton('order by start_date desc')}><a>Order By Date in (DSC)</a></li>
            </ul>
          </div>
        </div>

        
        <button className="border border-slate-100 rounded-md p-2 text-slate-400 flex gap-1 items-center"><BiSolidFileExport className='text-slate-200 w-[25px] h-[20px]'/> Export</button>
        
      </div>
    </div>
  )
}
