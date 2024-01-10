import React, { useEffect } from 'react'

export default function PatientDetails({ people,person:email }:any) {
    const [person,setPerson] = React.useState(people[0])
    
    useEffect(() => {
        setPerson(people.find((p:any) => p.email == email))
    },[email])
    
  return (
    <div className='px-6 mt-12'>
        <h1 className="text-2xl font-bold">Patient Details</h1>
        <div className='mt-5 px-2 flex flex-col gap-y-4'>
            <div><p className='text-black'>Name</p>
            <p className='text-gray-700'>{person?.name}</p></div>
            <div><p className='text-black'>Email</p>
            <p className='text-gray-700'>{person?.email}</p></div>
            <div className=''><p className='text-black '>Medical Conditions</p>
            <div className='flex flex-wrap gap-2'>            {person?.medical_conditions?.map((condition:any) => (<p className='bg-gray-200 px-3 py-1 rounded-md text-gray-700'>{condition}</p>))}</div>
            </div>
            <div className=''><p className='text-black '>Medicines </p>
            <div className='flex flex-wrap gap-2'>     {person?.medicines.map((medicine:any) => (<p className='bg-gray-200 px-3 py-1 rounded-md text-gray-700'>{medicine}</p>))}</div>
            </div>
        </div>
    </div>
  )
}
