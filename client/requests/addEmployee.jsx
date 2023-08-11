import React from 'react'

export default async function AddEmployee(data) {
  const res = await fetch('http://localhost:4000/employees',{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  if(!res.ok) throw new Error('Could not add employee')
}
