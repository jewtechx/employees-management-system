'use client'
import React from 'react';
import {updateEmployeeDetails} from '@/requests/updateEmployee';
import {useRouter} from 'next/navigation'

export default function Page({ params }) {
  var id = params.updateEmp;
  const [employee, setEmployee] = React.useState(null);
  const [formValues, setFormValues] = React.useState({});
  const [saving,setSaving] = React.useState('Save')

  React.useEffect(() => {
    getSpecificEmployee(id)
      .then((employeeData) => {
        setEmployee(employeeData[0]);
        setFormValues(formatFormValues(employeeData[0])); // Set formValues when employee data is fetched
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  // Separate function to format the API date string to the desired date format
  const formatFormValues = (data) => {
    return {
      ...data,
      date_of_birth: data.date_of_birth ? formatDateForInput(data.date_of_birth) : '', // Format API date
    };
  };

  // Function to format date to 'mm dd yyyy' format for the date input
  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString();
    let day = dateObject.getDate().toString();

    // Add leading zeros to month and day if they are single digits
    if (month.length === 1) month = '0' + month;
    if (day.length === 1) day = '0' + day;

    return `${month} ${day} ${year}`;
  };

  // Check if the 'employee' data has been fetched before rendering the component
  if (!employee) {
    return <div className='p-4 text-2xl text-slate-800 animate-pulse'>Loading...</div>;
  }

  try{
  function handleNewFormData(value, fieldName) {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
  }}catch(err){
    alert('Failed to update details. Probably some required field are empty')
  }

  async function handleSave(){
   setSaving('Saving...')
   await updateEmployeeDetails(formValues)
   setSaving('Save')
  }

  function clearData(){
    setFormValues(prev => ({
      first_name:'',
      last_name:'',
      email:'',
      phone_number:'',
      address:'',
      date_of_birth:'',
      gender:'',
      department:'',
      position:'',
      salary:'',
      start_date:'',
      supervisor:'',
      end_date:'',
      status:''
    }))
  }

  const router = useRouter()
  function cancelEntries(){
    router.push('/')
  }
  return (
      <div className='mt-6'>
        <h1 className='text-2xl text-slate-800'>Update {formValues.first_name}'s details</h1>

        <form className='flex flex-col gap-4 py-4 mt-4 w-[65%]'>
          <div className='sm:flex justify-between'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='first_name'>First Name</label>
              <input placeholder='eg. Jew' type='text' name='first_name' className='input  w-[250px]' value={formValues.first_name} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
            </div>


            <div className='flex flex-col gap-2'>
              <label htmlFor='last_name'>Last Name</label>
              <input placeholder='eg. Larbi' type='text' name='last_name' className='input  w-[250px]' value={formValues.last_name} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email Address</label>
              <input placeholder='eg. jwlarbi15@gmail.com' type='text' name='email' className='input  w-full' value={formValues.email} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>


        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='phone_number'>Phone Number</label>
              <input placeholder='eg. 0265865717' type='number' name='phone_number' className='input  w-[250px]' value={formValues.phone_number} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='address'>Address</label>
              <input placeholder='eg. 125 NY st' type='text' name='address' className='input  w-[250px]' value={formValues.address} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>
        </div>



        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='date_of_birth'>Date of Birth</label>
              <input placeholder='yyyy-dd-mm' type='text' name='date_of_birth' className='input  w-[250px]' value={formValues.date_of_birth} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='gender'>Gender</label>
              <input placeholder='male / female' type='text' name='gender' className='input  w-[250px]' value={formValues.gender} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>
        </div>


          <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='department'>Department</label>
              <input placeholder='management' type='text' name='department' className='input  w-[250px]' value={formValues.department} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='position'>Role</label>
              <input placeholder='C.E.O' type='text' name='position' className='input  w-[250px]' value={formValues.position} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='salary'>Salary</label>
              <input placeholder='9999999.00' type='text' name='salary' className='input  w-[250px]' value={formValues.salary} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>
        </div>


        <div className='sm:flex justify-between'>
        <div className='flex flex-col gap-2'>
              <label htmlFor='supervisor'>Supervisor</label>
              <input placeholder='God' type='text' name='supervisor' className='input  w-[250px]' value={formValues.supervisor} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='end_date'>End date</label>
              <input placeholder='yyyy-dd-mm' type='text' name='end_date' className='input  w-[250px]' value={formValues.end_date} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='status'>Status</label>
              <input placeholder='pending / verified / rejected' type='text' name='status' className='input  w-[250px]' value={formValues.status} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)}/>
          </div>

          
        </div>

        <div className='flex gap-3 items-center'>
          <button type='button' className='bg-[#00C896] p-2 rounded-sm text-slate-100 font-semibold' onClick={(e) => handleSave(e.target.value)}>{saving}</button>
          <button type='button' className='bg-slate-50 p-2 rounded-sm text-slate-400 font-semibold' onClick={() => clearData()}>Clear</button>
          <button type='button' className='bg-[#242423] p-2 rounded-sm text-slate-200 font-semibold' onClick={() => cancelEntries()}>Cancel</button>
        </div>

        </form>
      </div>

  )
}
