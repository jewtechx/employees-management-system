"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {getEmployees} from '@/requests/getEmployees'
import {deleteEmployee} from '@/requests/deleteEmployee'

import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const EmployeesTable = async() => {
  const router = useRouter()

  const employees = await getEmployees()
 
  //updating employee details
  function goToUpdateEmployeeDetails(id){
    router.push(`/${id}/${id}`)
  }

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th className='hidden sm:block'>Address</th>
          <th>Role</th>
          <th>Status</th>
          <th className='hidden sm:block'>Supervisor</th>
          <th>Action</th>
        </tr>

        {employees.map((employee) => (
          <tr key={employee.id}>
            <Link href={`/${employee.id}`}>
              <td className='flex text-left flex-col gap-1 hover:underline hover:text-slate-800'>
                <p>{employee.first_name} {employee.last_name}</p>
                <p>{employee.email}</p>
              </td>
            </Link>
            <td>N52-{employee.id}</td>
            <td className='hidden sm:block mt-4'>{employee.address}</td>
            <td>{employee.position}</td>
            <td>
              <p className={
      employee.status === 'verified'
        ? 'p-1 bg-green-700/80 text-slate-100 rounded-md'
        : employee.status === 'pending'
        ? 'p-1 bg-yellow-500 text-slate-100 rounded-md'
        : 'p-1 bg-red-600/90 text-slate-100 rounded-md'
    }>{employee.status}</p>
            </td>
            <td className='hidden sm:block mt-4'>{employee.supervisor}</td>
            <td className='gap-1'>
              <button onClick={() => goToUpdateEmployeeDetails(employee.id)}><BiSolidEdit size={22} color='lightblue' /></button>
              <button onClick={() => deleteEmployee(employee.id)}><BiSolidTrash size={22} color='pink' /></button>
            </td>
          </tr>
        ))}

      </table>
    </div>
  );
};

export default EmployeesTable;
