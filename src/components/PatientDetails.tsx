import React, { useEffect } from 'react'

export default function PatientDetails({ people,person:email }:any) {
    const [person,setPerson] = React.useState(people[0])
    
    useEffect(() => {
        setPerson(people.find((p:any) => p.email == email))
    },[email])
    
  return (
    <div className=' text-black p-6 h-screen overflow-y-scroll'>
        <h1 className="text-2xl font-bold">Patient Details</h1>
        <div className=' px-2 flex flex-col gap-y-4 h-full overflow-y-scroll '>
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
            {/* 1.	Surgery Details
	•	Type of Surgery: Appendectomy
	•	Date of Surgery: January 15, 2024
	•	Surgeon’s Name: Dr. Emily Clark
	2.	Patient Information
	•	Patient Name: John Doe
	•	Age: 34
	•	Medical History: No prior major surgeries; history of mild gastrointestinal issues.
	3.	Post-Surgery Status
	•	Days Since Surgery: 10 days
	•	Current Health Status: Stable, showing signs of good recovery. No signs of infection at the surgical site.
	•	Recovery Progress: Patient is responding well to post-operative care, pain management is effective, and diet is gradually returning to normal.
	4.	Additional Notes
	•	John has been advised to avoid strenuous activities for the next 4 weeks. Follow-up consultation scheduled for February 10, 2024. */}

        <div>
            <p className='text-black '>Surgery Details</p>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Type of Surgery:</p>
                    <p className='text-gray-700'>Appendectomy</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Date of Surgery:</p>
                    <p className='text-gray-700'>January 15, 2024</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Surgeon’s Name:</p>
                    <p className='text-gray-700'>Dr. Emily Clark</p>
                </div>
            </div>
        </div>
        <div>
            <p className='text-black '>Patient Information</p>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Patient Name:</p>
                    <p className='text-gray-700'>John Doe</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Age:</p>
                    <p className='text-gray-700'>34</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Medical History:</p>
                    <p className='text-gray-700'>No prior major surgeries; history of mild gastrointestinal issues.</p>
                </div>
            </div>
        
    </div>
    <div>
            <p className='text-black '>Post-Surgery Status</p>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Days Since Surgery:</p>
                    <p className='text-gray-700'>10 days</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Current Health Status:</p>
                    <p className='text-gray-700'>Stable, showing signs of good recovery. No signs of infection at the surgical site.</p>
                </div>
                <div className='flex gap-x-2'>
                    <p className='text-gray-700'>Recovery Progress:</p>
                    <p className='text-gray-700'>Patient is responding well to post-operative care, pain management is effective, and diet is gradually returning to normal.</p>
                </div>
            </div>
            </div>  
            </div>
    </div>
  )
}
