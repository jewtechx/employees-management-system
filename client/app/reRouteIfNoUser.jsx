"use client"
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { filterEmployee,setBackendFilterValue, reset } from '@/redux/employees/employees.reducer';

export default function ReRouteIfNoUser() {
      //getting token
  var name

  if (typeof window !== 'undefined') {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      name = userData.name;
    } else {
      console.log("User data not found in localStorage.");
    }

const dispatch = useDispatch()

  //employes
  const lsCondition =  window.localStorage.getItem('filterFromBackend')
  const filterCondition = JSON.parse(lsCondition)
  dispatch(setBackendFilterValue(filterCondition))
  // const condition = useSelector((state) => state.employees.backendFilterCondition)
    
    useEffect(() => {
      dispatch(filterEmployee(filterCondition))
      dispatch(reset())
    },[])
      

  
  //checking for user
  }
    if (!name) {
      window.location = '/auth/login'
    } else {
      console.log('User present')
    }
 

  return (
    <div>
      
    </div>
  )
}
