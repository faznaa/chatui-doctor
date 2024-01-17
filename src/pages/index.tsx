import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import InboxList from '@/components/InboxList'
import ChatContainer from '@/components/ChatContainer'
import { useState } from 'react'
import PatientDetails from '@/components/PatientDetails'
import { medical_conditions, medicines, people } from '@/helpers/data'
import ChatSteps from '@/components/ChatSteps'

const inter = Inter({ subsets: ['latin'] })

const ChatUIOld = () => {
  const [person, setPerson] = useState(people[0].patient_number)
  
return (
  <div className='h-screen text-black bg-[#0A316F] w-full sm:flex justify-between items-center'>
      <div className='sm:w-[60px] bg-[#023E8A] h-full'>
        <Navigation />
      </div>
      <div className='sm:w-5/12 bg-white h-full'>
        <InboxList people={people} setPerson={setPerson} />
      </div>

      <div className='sm:w-full bg-white h-full'>
        <ChatContainer  people={people} person={person}/>
      </div>
      <div className='sm:w-6/12 bg-white h-screen'>
        <PatientDetails  people={people} person={person} />
      </div>

    </div>
)
}

export default function Home() {
  return (
    <div className='min-h-screen text-black bg-sky-900 w-full sm:flex justify-between items-center'>
      <ChatSteps />
    </div>
  )
}
