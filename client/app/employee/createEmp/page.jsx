"use client"
import React,{useEffect} from 'react'
import {AddEmployee} from '../../../redux/employees/employees.reducer'
import { useRouter } from 'next/navigation'
import ReduxProvider from '../../provider'
import { useSelector,useDispatch } from 'react-redux'

export default function page({params}) {
  const router = useRouter()
  const [saving,setSaving] = React.useState('Save')
  const [formValues,setFormValues] = React.useState({
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
  })

  const formatDateForInput = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString();
    let day = dateObject.getDate().toString();

    // Add leading zeros to month and day if they are single digits
    if (month.length === 1) month = '0' + month;
    if (day.length === 1) day = '0' + day;

    return `${year} ${day} ${month} `;
  };
  formatDateForInput()

  function handleNewFormData(value, name) {
    const date = formatDateForInput();
  
    let updatedValue = value;
  
    if (name === 'phone_number') {
      // Remove non-numeric characters from the phone number and convert to a number
      updatedValue = Number(value.replace(/\D/g, ''));
    }
  
    let updatedEndDateValue = null;
    if (name === 'end_date') {
      // Convert empty end_date to null
      updatedEndDateValue = value === '' ? null : value;
    }
  
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      start_date: date,
      end_date: updatedEndDateValue !== undefined ? updatedEndDateValue : null,
      [name]: updatedValue,
    }));
  
  }
  
  const dispatch = useDispatch()
  const state = useSelector((state) => state.employees)
  const {loading,error,ready} = state

  async function handleSave() {
    setSaving('Saving...') 
    try{
      await dispatch(AddEmployee(formValues))
    }catch(err){
      alert('Error adding employee')
    }
    setSaving('Save')
   }

  
  useEffect(() => {
      
    if (ready) {
      router.push('/')
    }
   },[ready,router])

  
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

  function cancelEntries(){
    router.push('/')
  }
  return (
    <ReduxProvider>
    <div className='mt-6'>
        <h1 className='text-2xl text-slate-800'>Add a new employee</h1>

        <form className='flex flex-col gap-4 py-4 mt-4 w-[65%]'>
          <div className='sm:flex justify-between'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='first_name'>First Name</label>
              <input type='text' name='first_name' className='input  w-[250px]' value={formValues.first_name} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='eg. Jew'/>
            </div>


            <div className='flex flex-col gap-2'>
              <label htmlFor='last_name'>Last Name</label>
              <input type='text' name='last_name' className='input  w-[250px]' value={formValues.last_name} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='eg. Larbi'/>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email Address</label>
              <input type='text' name='email' className='input  w-full' value={formValues.email} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='eg. jwlarbi15@gmail.com'/>
          </div>


        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='phone_number'>Phone Number</label>
              <input type='number' name='phone_number' className='input  w-[250px]' value={formValues.phone_number} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='eg. 0265865717'/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='address'>Address</label>
              <input type='text' name='address' className='input  w-[250px]' value={formValues.address} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='eg. 125 NY st'/>
          </div>
        </div>



        <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='date_of_birth'>Date of Birth</label>
              <input type='text' name='date_of_birth' className='input  w-[250px]' value={formValues.date_of_birth} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='yyyy-dd-mm'/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='gender'>Gender</label>
              <input type='text' name='gender' className='input  w-[250px]' value={formValues.gender} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='male / female'/>
          </div>
        </div>


          <div className='sm:flex justify-between'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='department'>Department</label>
              <input type='text' name='department' className='input  w-[250px]' value={formValues.department} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='management'/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='position'>Role</label>
              <input type='text' name='position' className='input  w-[250px]' value={formValues.position} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='C.E.O'/>
          </div>
          <div className='flex flex-col gap-2'>
              <label htmlFor='salary'>Salary</label>
              <input type='text' name='salary' className='input  w-[250px]' value={formValues.salary} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='9999999.00'/>
          </div>
        </div>


        <div className='sm:flex justify-between'>
        <div className='flex flex-col gap-2'>
              <label htmlFor='supervisor'>Supervisor</label>
              <input type='text' name='supervisor' className='input  w-[250px]' value={formValues.supervisor} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='God'/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='end_date'>End date</label>
              <input type='text' name='end_date' className='input  w-[250px]' value={formValues.end_date} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='yyyy-dd-mm'/>
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor='status'>Status</label>
              <input type='text' name='status' className='input  w-[250px]' value={formValues.status} onChange={(e) =>  handleNewFormData(e.target.value , e.target.name)} placeholder='pending / verified / rejected'/>
          </div>

          
        </div>

        <div className='flex gap-3 items-center'>
          <button type='button' className='bg-[#00C896] p-2 rounded-sm text-slate-100 font-semibold' onClick={(e) => handleSave(e.target.value)}>{saving}</button>
          <button type='button' className='bg-slate-50 p-2 rounded-sm text-slate-400 font-semibold' onClick={() => clearData()}>Clear</button>
          <button type='button' className='bg-[#242423] p-2 rounded-sm text-slate-200 font-semibold' onClick={() => cancelEntries()}>Cancel</button>
        </div>

        </form>
      </div>
      </ReduxProvider>
  )
}
