import React from 'react'
import {useRouter} from 'next/navigation'
import { router } from '../../SERVER/src/app'
export default async function editEmployee() {
    

    const employee = await fetch(`http://localhost:4343/employees/${id}`)
  return (
    <div className=''>
      
    </div>
  )
}
