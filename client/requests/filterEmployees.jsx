import { useSelector } from "react-redux"

export default async function FilterEmployees(condition) {
   const token = useSelector((state) => state.auth.token)

   const res = await fetch(`http://localhost:4000/employees/filter`,{
      method:'POST',
      headers:{
         'Content-Type':'application/json',
         Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({condition:condition})
   })
   if (!res.ok) throw new Error('Filtering gone wrong in backend')
   return await res.json(); 
}
