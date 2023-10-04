"use client"
import { useEffect,useRef,useState } from 'react'
import {BiSolidNotification,BiSolidUserPlus,BiSolidFileImport,BiSolidLogOut} from 'react-icons/bi'
import {useRouter} from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AddEmployee } from '@/redux/employees/employees.reducer'

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

  //import csv
  const input = useRef();
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const [csvObject, setCsvObject] = useState([]); // Initialize an empty object to store the data

  const dispatch = useDispatch()
 
  function openInput() {
    input.current.click();
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;

        // Parse the CSV data and set it into an object
        importCsvData(text);
      };
      reader.readAsText(selectedFile);
    }
 
  }

  const importCsvData = (csvText) => {
    const rows = csvText.split('\n');
    const headerRow = rows[0].split(',').map((field) => field.replace(/"/g, '')); // Parse header row
    const data = [, ...rows].map((row) => {
      const values = row.split(',').map((field) => field.replace(/"/g, '')); // Remove double quotes from each field
      const rowData = {};
      headerRow.forEach((header, index) => {
        rowData[header] = values[index];
      });
      return rowData;
    });
  
    // Set the CSV data as an array of objects
    setCsvObject(data);
  
      // Assuming `dispatch` is properly connected to Redux and `AddEmployee` handles the API/database request
      csvObject.forEach(object => {
        console.log(object)
        dispatch(AddEmployee(object))
      })
    
  };
  
  //profile
  const [showDropdown, setShowDropDown] = useState(false)
  

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 py-4 justify-end  items-center'>
         <BiSolidNotification size={24}/>
         <p className='text-slate-600 font-bold'>{name}</p>
         {/* <Image src='/cut1.png' alt='profile' width={30} height={30} className='rounded-full'/> */}
         
         <span className="relative inline-block overflow-hidden rounded-full bg-gray-100">
          <svg onClick={() => {
            setShowDropDown(bool => !bool)
            // window.addEventListener('click',() => setShowDropDown(false))
          }} className="active:scale-[0.5] cursor-pointer h-10 w-10 text-gray-300 " fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
          <div className={`z-10 profile_dropdown absolute ${!showDropdown ? '-top-[200px]' : 'top-[56px]'} w-44  p-4 rounded-md shadow-md bg-white`}>

              <button onClick={() => { router.push('/profile') }} type='button' className='text-slate-800 hover:bg-slate-50 mb-2 cursor-pointer p-[0.3rem] rounded-[0.2rem] text-[12px] font-bold gap-2 px-2 flex items-center w-full border-b-[1.5px]'>
                  
                  Profile
              </button>
              <button onClick={() => { router.push('/settings') }} type='button' className='text-slate-800 hover:bg-slate-50 mb-2 cursor-pointer p-[0.3rem] rounded-[0.2rem] text-[12px] font-bold gap-2 px-2 flex items-center w-full border-b-[1.5px]'>
                  Settings
              </button>
              <button onClick={() => { localStorage.removeItem("user"); window.location.href = '/auth/login'; }} type='button' className='text-slate-800 hover:bg-slate-50 mb-2 cursor-pointer p-[0.3rem] rounded-[0.2rem] text-[12px] font-bold gap-2 px-2 flex items-center w-full border-b-[1.5px]'>
                  Log Out
                </button>
          </div>
        
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

          <button onClick={openInput} type='button' className='bg-slate-900 hover:bg-neutral-focus cursor-pointer p-[0.3rem] rounded-[0.2rem] text-base-200 text-[12px] font-bold gap-2 px-2 flex items-center'>
             <BiSolidFileImport size={21}/>
             Import
          </button>
          <input type="file" accept=".csv" ref={input} onChange={handleFileChange} hidden/>
        </div>
      </div>
    </div>
  )
}
