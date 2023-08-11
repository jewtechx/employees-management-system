export const getEmployees = async() => {
  const res = await fetch('http://localhost:4000/employees',{next:{revalidate:5}})

  if (!res.ok) throw new Error('Fetch request failed probably due to network connectivity')

  return await res.json()
}