import { useSelector } from "react-redux"

export const getSpecificEmployee = async(id) => {
  const token = useSelector((state) => state.auth.token)
  const res = await fetch(`http://localhost:4000/employees/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

 
  if(!res.ok) throw new Error('Employee not found')
  return await res.json()
}