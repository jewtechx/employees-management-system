import React from 'react'
import dynamic from 'next/dynamic';
import FilterTable from '../components/filterTable'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import  ReRouteIfNoUser from './reRouteIfNoUser'

const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});


export default async function Page() {

  
  return (
        <div className='w-full flex flex-col mt-12 justify-center'>
        < ReRouteIfNoUser />  
        <FilterTable />
        <DynamicEmployeesTable />
      </div>
  );
}
