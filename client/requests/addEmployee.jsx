import React from 'react'
import { useSelector } from "react-redux"

export default async function AddEmployee(data) {
  const token = useSelector((state) => state.auth.token)
  const res = await fetch('http://localhost:4000/employees',{
    method:'post',
    headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
    },
    body:JSON.stringify(data)
  })

  if(!res.ok) throw new Error('Could not add employee')
}
