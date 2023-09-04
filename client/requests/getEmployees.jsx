
import { useSelector } from 'react-redux';

async function FilterEmployees() {
  const token = useSelector((state) => state.auth.token);
  const res = await fetch('http://localhost:4000/employees',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error('Fetch request failed probably due to network connectivity')

  return await res.json()
}

export default FilterEmployees;
