"use client"
import React,{useEffect} from 'react'
import dynamic from 'next/dynamic';
import FilterTable from '../components/filterTable'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { getEmployees } from '@/redux/employees/employees.reducer';

const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});


export default function Page() {
  //getting token
  var name, email
  const router = useRouter();

const userDataString = localStorage.getItem("user");
if (userDataString) {
const userData = JSON.parse(userDataString);
email = userData.email;
 name = userData.name;
} else {
console.log("User data not found in localStorage.");
}

if (name) {
  router.push('/')
}else{
  router.push('/auth/login')
}

  //employes
const dispatch = useDispatch()
useEffect(() => { dispatch(getEmployees()) }, [])
  
  return (
        <div className='w-full flex flex-col mt-12 justify-center'>
        <FilterTable/>
        <DynamicEmployeesTable />
      </div>
  );
}
