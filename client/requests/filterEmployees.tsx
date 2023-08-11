import React from 'react'

export default async function FilterEmployees(condition: string) {
   const res = await fetch(`http://localhost:4000/employees/filter`,{
      method:'POST',
      headers:{
         'Content-Type':'application/json'
      },
      body:JSON.stringify({condition:condition})
   })
   if (!res.ok) throw new Error('Filtering gone wrong in backend')
   return res.json(); 
}
