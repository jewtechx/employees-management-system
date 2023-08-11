"use client"
import React,{useEffect, useState} from 'react'
import dynamic from 'next/dynamic';
import FilterTable from '../components/filterTable'
import { getEmployees } from '@/requests/getEmployees';
import FilterEmployees from '@/requests/filterEmployees';
const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  
  //getting and filtering employees data
  const [employees,setEmployees] = useState([])
  useEffect(() => {
    setEmployees(getEmployees())
  },[])

  const [filterValue,setFilterValue] = useState('')

  //filter by button
  const [filterButtonCondition,setFilterButtonCondition] = useState('')

  const [filteredEmployeesByButton,setFilteredEmployeesByButton] = useState([])
  useEffect(() => {
    setFilteredEmployeesByButton(FilterEmployees(filterButtonCondition))
    console.log(filteredEmployeesByButton)
  },[filterButtonCondition])

  return (
    <div className='w-full flex flex-col mt-12 justify-center'>
      <FilterTable filterValue = {setFilterValue} filterButtonCondition={setFilterButtonCondition}/>
      <DynamicEmployeesTable employees={employees} filterValue={filterValue} filterOnButtonValue={filteredEmployeesByButton} />
    </div>
  );
}
