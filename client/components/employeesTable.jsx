"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {deleteEmployee} from '@/requests/deleteEmployee'

import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default async function EmployeesTable(props){
  const router = useRouter()
  
  console.log(await props.filterOnButtonValue);
  //getting filtered employees

  const employeesOnFiltered = await props.employees;
  const employeeButtonFilteredData = await props.filterOnButtonValue;

  const employees = await employeeButtonFilteredData ? await employeeButtonFilteredData:await employeesOnFiltered.filter(
    data => data.first_name.toLowerCase().includes(props.filterValue) ||
    data.last_name.toLowerCase().includes(props.filterVale)||
    data.email.toLowerCase().includes(props.filterValue) ||
    data.id.split('-')[0].includes(props.filterValue)) 

    //data 
    const employeeData = await employeeButtonFilteredData ? employeeButtonFilteredData : await employees.map((employee) => (
      <tbody key={employee.id}>
      <tr key={employee.id}>
        <Link href={`/employee/${employee.id}`}>
          <td className='flex text-left flex-col gap-1 hover:underline hover:text-slate-800'>
            <p>{employee.first_name} {employee.last_name}</p>
            <p>{employee.email}</p>
          </td>
        </Link>
        <td>{employee.id.split('-')[0]}</td>
        <td className='hidden sm:block mt-4'>{employee.address}</td>
        <td>{employee.position}</td>
        <td>
          <p className={
  employee.status === 'verified'
    ? 'p-2 bg-success text-base-200 rounded-sm'
    : employee.status === 'pending'
    ? 'p-2 bg-warning text-base-200 rounded-sm'
    : 'p-2 bg-error text-base-200 rounded-sm'
  }>{employee.status}</p>
        </td>
        <td className='hidden sm:block mt-4'>{employee.supervisor}</td>
        <td className='gap-1'>
          <button onClick={() => goToUpdateEmployeeDetails(employee.id)}><BiSolidEdit size={22} color='lightblue' /></button>
       
        <button onClick={() => deleteEmployee(employee.id)}><BiSolidTrash size={22} color='pink' /></button>
        </td>
      </tr>
      </tbody>
    ))

    
    
    //updating employee details
    
    function goToUpdateEmployeeDetails(id){
      router.push(`/employee/${id}`)
    }
    
    // const [modal,setModal] = useState('hidden')
  //show modal
  // function showModal(){
  //  setModal('block')
  //  alert(modal)
  // }

  return (
    <div>
      <table className=''>
        <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th className='hidden sm:block'>Address</th>
          <th>Role</th>
          <th>Status</th>
          <th className='hidden sm:block'>Supervisor</th>
          <th>Action</th>
        </tr>
        </thead>

        {
          // employeeButtonFilteredData ? employeeButtonFilteredData : employees
        }
      </table>
    </div>
  );
};

