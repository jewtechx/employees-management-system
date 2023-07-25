import React from 'react';
import {getSpecificEmployee} from '@/requests/getSpecEmployee'

export default async function Page({ params}) {
  const id = +params.employee 
  const employee = await getSpecificEmployee(id)

  return (
    <div className='mt-6'>
      <h1 className='text-2xl text-slate-800'>{employee[0].first_name}'s details</h1>
    </div>
  );
}
