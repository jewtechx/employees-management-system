import {BiSolidSearch, BiSolidFilterAlt,BiSolidFileExport} from 'react-icons/bi'

export default function FilterTable(props) {
  //getting wildcards
   function getFilterValue(value){
     props.filterValue(value.toLowerCase())
  }

  function filterByButton(condition){
    props.filterButtonCondition("where first_name = 'Jew'")
  }
  filterByButton()
  return (
    <div className="">
      <div className="flex gap-2 items-center filter-input justify-between mt-2 flex-wrap">
        <div className="flex gap-2">
            <div className="flex items-center">
                <BiSolidSearch className="p-1 border border-slate-100 rounded-md w-[34px] h-[30px] text-slate-200"/>
                <input onChange={(e) => getFilterValue(e.target.value)} type="text" placeholder="Search by name,email,id..." className='p-2 border border-slate-100 rounded-md outline-slate-100 text-slate-500'/>
            </div>

            <button className="border border-slate-100 rounded-md p-1 text-slate-400 flex gap-1 items-center"><BiSolidFilterAlt className='text-slate-200 w-[25px] h-[20px]'/> Filter</button>
        </div>

        
        <button className="border border-slate-100 rounded-md p-2 text-slate-400 flex gap-1 items-center"><BiSolidFileExport className='text-slate-200 w-[25px] h-[20px]'/> Export</button>
        
      </div>
    </div>
  )
}
