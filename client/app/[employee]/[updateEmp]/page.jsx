  import React from 'react';
  import {getSpecificEmployee} from '@/requests/getSpecEmployee'

  export default async function Page({ params}) {
    const id = +params.updateEmp 
    const employee = await getSpecificEmployee(id)

    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      return dateObject.toString() !== 'Invalid Date'
        ? `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`
        : 'Invalid Date';
    };
  
    const formattedDOB = formatDate(employee.date_of_birth);
    return (
      <div className='mt-6'>
        <h1 className='text-2xl text-slate-800'>Update {employee[0].first_name}'s details</h1>

        <form className='flex flex-col gap-4 py-4 mt-4 w-[65%]'>
          <div className='sm:flex justify-between'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='first_name'>First Name</label>
              <input type='text' name='first_name' className='input  w-[250px]' value={employee[0].first_name}/>
            </div>


            <div className='flex flex-col gap-2'>
              <label htmlFor='last_name'>Last Name</label>
              <input type='text' name='last_name' className='input  w-[250px]' value={employee[0].last_name}/>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email Address</label>
              <input type='text' name='email' className='input  w-full' value={employee[0].email}/>
          </div>


        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='phone_number'>Phone Number</label>
              <input type='number' name='phone_number' className='input  w-[250px]' value={employee[0].phone_number}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='address'>Address</label>
              <input type='text' name='address' className='input  w-[250px]' value={employee[0].address}/>
          </div>
        </div>



        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='date_of_birth'>Date of Birth</label>
              <input type='text' name='date_of_birth' className='input  w-[250px]' value={formattedDOB}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='gender'>Gender</label>
              <input type='text' name='address' className='input  w-[250px]' value={employee[0].gender}/>
          </div>
        </div>


          <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='department'>Department</label>
              <input type='text' name='department' className='input  w-[250px]' value={employee[0].department}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='position'>Role</label>
              <input type='text' name='position' className='input  w-[250px]' value={employee[0].position}/>
          </div>
        </div>


        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='salary'>Salary</label>
              <input type='text' name='salary' className='input  w-[250px]' value={employee[0].salary}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='supervisor'>Supervisor</label>
              <input type='text' name='supervisor' className='input  w-[250px]' value={employee[0].supervisor}/>
          </div>
        </div>


        </form>
      </div>
    );
  }
