export const getSpecificEmployee = async(id) => {
  const res = await fetch(`http://localhost:4000/employees/${id}`)

 
  if(!res.ok) throw new Error('Employee not found')
  return await res.json()
}