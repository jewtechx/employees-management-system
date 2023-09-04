"use client"
import React,{useEffect, useState} from 'react'
import dynamic from 'next/dynamic';
import FilterTable from '../components/filterTable'
const DynamicEmployeesTable = dynamic(() => import('@/components/employeesTable'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  
  return (
        <div className='w-full flex flex-col mt-12 justify-center'>
        <FilterTable/>
        <DynamicEmployeesTable />
      </div>
  );
}
