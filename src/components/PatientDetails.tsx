import React, { useEffect } from 'react'

export default function PatientDetails({ people,person:email }:any) {
    const [person,setPerson] = React.useState(people[0])
    
    useEffect(() => {
        setPerson(people.find((p:any) => p.email == email))
    },[email])
    
  const SubHeading = ({ children , type='y'}:any) => (
    <h2 className={`text-black ${type=='x' ? 'font-bold text-lg' :'font-semibold'}`}>{children}</h2>
  )
  const Content = ({ children }:any) => (
    <p className='text-gray-700'>{children}</p>
  )
  return (
    <div className=' text-black p-6 h-screen overflow-y-scroll'>
        <h1 className="text-2xl font-bold pb-6">Chat Info</h1>
        <div className=' px-2 flex flex-col gap-y-4 h-full overflow-y-scroll '>
            {/* <div><SubHeading>Name</SubHeading>
            <Content>{person?.name}</Content></div>
            <div>
                <SubHeading>Email</SubHeading>
                <Content>{person?.email}</Content>
                </div>
            <div className=''><SubHeading>Medical Conditions</SubHeading>
            <div className='flex flex-wrap gap-2'>            {person?.medical_conditions?.map((condition:any) => (<p className='bg-gray-200 px-3 py-1 rounded-md text-gray-700'>{condition}</p>))}</div>
            </div>
            <div className=''><p className='text-black '>Medicines </p>
            <div className='flex flex-wrap gap-2'>     {person?.medicines.map((medicine:any) => (<p className='bg-gray-200 px-3 py-1 rounded-md text-gray-700'>{medicine}</p>))}</div>
            </div> */}
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
            <SubHeading type='x'>Patient Information</SubHeading>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                    <SubHeading >Patient Name:</SubHeading>
                    <p className='text-gray-700'>John Doe</p>
                </div>
                <div className='flex gap-x-2'>
                    <SubHeading >Age</SubHeading>
                    <p className='text-gray-700'>34</p>
                </div>
                <div className=' gap-x-2'>
                    <SubHeading >Medical History:</SubHeading>
                    <p className='text-gray-700'>No prior major surgeries; history of mild gastrointestinal issues.</p>
                </div>
            </div>
        
    </div>
        <div>
            <SubHeading type='x'>Surgery Details</SubHeading>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                   <SubHeading >Type of Surgery:</SubHeading>
                    <p className='text-gray-700'>Appendectomy</p>
                </div>
                <div className='flex gap-x-2'>
                    <SubHeading  >Date of Surgery:</SubHeading>
                    <p className='text-gray-700'>January 15, 2024</p>
                </div>
                <div className='flex gap-x-2'>
                    <SubHeading  >Surgeon’s Name:</SubHeading>
                    <p className='text-gray-700'>Dr. Emily Clark</p>
                </div>
            </div>
        </div>
        
    <div>
            <SubHeading type='x'>Post-Surgery Status</SubHeading>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-2'>
                    <SubHeading >Days Since Surgery:</SubHeading>
                    <p className='text-gray-700'>10 days</p>
                </div>
                <div className=' gap-x-2'>
                    <SubHeading >Current Health Status:</SubHeading>
                    <p className='text-gray-700'>Stable, showing signs of good recovery. No signs of infection at the surgical site.</p>
                </div>
                <div className=' gap-x-2'>
                    <SubHeading >Recovery Progress:</SubHeading>
                    <p className='text-gray-700'>Patient is responding well to post-operative care, pain management is effective, and diet is gradually returning to normal.</p>
                </div>
            </div>
            </div>  
            </div>
    </div>
  )
}
