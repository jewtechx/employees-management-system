"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {deleteEmployee} from '@/redux/employees/employees.reducer'
import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import {useSelector,useDispatch} from 'react-redux'
import { useRouter } from 'next/navigation';
import NoEmployee from './noEmployee'
import Modal from './modal'

// import {CSVLink} from 'react-csv'
export default async function EmployeesTable(){
  
  //go to update employee
       const router = useRouter()
      function goToUpdateEmployeeDetails(id){
        router.push(`/employee/${id}`)
  }
  
  //delete employee
  const [isModalOpen, setIsModalOpen] = useState(false);

  function deleteEmployeeModalShow() {
    setIsModalOpen(bool => !bool)
  }

  const empList = useSelector((state) => state.employees.employees)
  const filter = useSelector((state) => state.employees.filter);

  const reversedEmployeeArray = [...empList].reverse();

    const employees = reversedEmployeeArray.filter(
    data => data.first_name.toLowerCase().includes(filter) ||
    data.last_name.toLowerCase().includes(filter) ||
    data.email.toLowerCase().includes(filter) ||
    data.id.split('-')[0].includes(filter)) 

    const employeeData = await employees.map((employee) => (
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
       
        <button onClick={() => deleteEmployeeModalShow()}><BiSolidTrash size={22} color='pink' /></button>
            {isModalOpen && <Modal
              desc={`Do you wan't to delete ${employee.first_name} from the employees list ? You can't reverse this action`}
              dialogue_title={'Deleting Employee'}
              button1={'Yes, delete'}
              button2={'Cancel'}
              id={employee.id}
              setModal={setIsModalOpen}
            />
            }
          </td>
      </tr>
      </tbody>
    ))

    
    
  

  return (
    <div>
      {empList.length > 0 ? (
      
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
           employeeData  ? employeeData : <h1>No employee added</h1>   
              }
        </table>
        
      ) : (
          <NoEmployee />
      )}
    </div>
  );
};

