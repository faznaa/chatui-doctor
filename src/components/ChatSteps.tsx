import { people } from "@/helpers/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useStep } from "usehooks-ts";

const Home = ({ nextStep }: any) => (
  <div className="text-center flex flex-col ">
    <h1 className="text-4xl sm:text-9xl font-bold text-white my-2">re:surge</h1>
    <h3 className="text-3xl font-semibold text-white font-italic">
      <i>Speak with your Doctor</i>
    </h3>
    <button
      onClick={() => nextStep()}
      className="mt-16 bg-white rounded-xl text-xl px-6 py-3 text-sky-900 font-semibold"
    >
      GET STARTED TO DEMO
    </button>
  </div>
);

const doctorImage = 'https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function ChatSteps() {
  const [currentStep, helpers] = useStep(5);

  const [email,setEmail] = React.useState('')
  const [patient,setPatient] = React.useState<any>(people[0])
  const _concerns = [
    "Fever","Wound concern","Pain","Bowel movements","Wound healing","Staple/sutures","Drains","Other"]
  
  const [selectedConcerns,setSelectedConcerns] = React.useState<any>(_concerns[0])
 
  const [concerns,setConcerns] = React.useState<any>(_concerns)
    useEffect(() => {
        const person = people.find((person) => person.email == email)
        if(person) setPatient(person)
    },[email])
  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const ChoosePatient = () => {
    const choose = (email:string) => {
        setEmail(email)
        goToNextStep()
    }
    return(
    <div className="text-center grid grid-cols-3 w-full ">
        {people.map((person) => (<div className="sm:w-[400px] sm:h-[200px] cursor-pointer my-10 flex flex-col items-center text-white justify-center" onClick={() => choose(person.email)}>
            <img src={person.imageUrl} alt="" className='h-40 w-40 rounded-full'/>
            <h1 className="text-2xl font-semibold">{person.name.split(" ")[0]}</h1>
            <h3 className="text-lg">{person.surgery}</h3>
        </div>))}
    </div>)
  };
  const ChatRepeatComponent = ({ children ,sidebar }:any) => <div className="relative w-full flex flex-col items-center min-w-screen ">
  {/* Top left corner profile picture  */}
  <div className="absolute top-0 left-0 z-10 text-white m-4">
      <div className="flex justify-start gap-x-4">
      <img src={patient.imageUrl} alt="" className='h-20 w-20 rounded-full'/>
      <div>
          <h1 className="text-xl font-semibold">{patient.name}</h1>
          <h3 className="text-lg">{patient.surgery}</h3>
          <h3 className="text-lg">Dr.Stein</h3>

      </div>
      </div>
  </div>
  {/* Chatbox  */}
 <div className="w-full flex justify-around items-center mt-20">
 <div className="w-1/2 sm:max-w-md bg-white rounded-3xl  mt-20 mx-12 h-[600px] relative">
      <div className="w-full flex items-center justify-center gap-y-4 p-4">
      <img alt="doctor" src={doctorImage} className='h-20 w-20 rounded-full'/>

      </div>
      {children}
      
  </div>
  {/* NEXT DIV  */}
  <div className="w-1/2 flex items-center justify-center">
{sidebar}
  </div>
 </div>
</div>

  const ChatPage = () => {
    const nextStep = (_concern: string) => {
        setSelectedConcerns(_concern)
        goToNextStep()
    }
    
    return (
        <ChatRepeatComponent sidebar={""}>
            <>
            <p className="text-center mt-6">
      Hi {patient.name.split(" ")[0]}, I am Jess, Dr.Stein's virtual re:surge assistant. I will be helping collect the right information
      about your concern and directing it to Dr.Stein or a colleague on-call.
      </p>
      <p className="mt-4 text-center">
          To begin, do you mind telling me what type of concern you have related to your recent {patient.surgery} ?
      </p>

      <div className="grid grid-cols-2 gap-y-4 mt-8">
          {concerns.map((concern:any) => <div className="flex justify-center items-center w-full px-8 ">
              <div className="bg-sky-600 rounded-2xl px-4 py-2 w-full h-16 flex justify-center items-center text-white text-center cursor-pointer" onClick={() => nextStep(concern)}>
              {concern}
              </div>
          </div>)}
          </div>
         
          </>
        </ChatRepeatComponent>
    )
  }

  const ChatPage2 = () => {
    const [isMessageGeneratedVisible, setMessageGeneratedVisible] = useState(false)
    const [msg,setMsg] = useState('')
    const checkIfEnterPressed = (e:any) => {
      if(e.keyCode == 13){
        setAllMsgs([...allMsgs,msg])
        setMsg("")
      }
      
    }
    const [allMsgs, setAllMsgs] = useState<any>([])
    return (
        <ChatRepeatComponent sidebar={isMessageGeneratedVisible ? (<div className="font-semibold bg-white sm:max-w-md px-4 rounded-lg h-[600px] mt-20">
          <div className="flex justify-end p-2 ">
            <button onClick={() => setMessageGeneratedVisible(false)} className="text-sky-600 font-semibold">
              <XMarkIcon className="w-6 h-6"/>
            </button>
          </div>
          <br/>
          <div> Name : {patient.name} </div>
          <div> Email : {patient.email} </div>
          <div> Age : 28 </div>
          <div>Surgeon : Stein</div>
          <div> Procedure : {patient.surgery} </div>
          <div className="my-4">
            Chief complaint : {selectedConcerns}
          </div>
          <div className="my-4">
            Summary : Patient reports pain in their incision site. Currently taking Acetaminophen 500mg. No other concerns.
          </div>
          <div className="my-4">
            Contact preferred : Phone call<br/>
            Contact : +91123456789

            </div>
        </div>):<button className="bg-white py-4 px-2 rounded-lg" onClick={() => setMessageGeneratedVisible(true)} >
        Press here to see the message<br/> generated for the<br/> on-call provider
    </button>}>
        <>
        <div className="p-4">
        <p className="text-center mt-6">
  Okay. I understand that you are concerned about {selectedConcerns}. I will ask you a few questions to help Dr.Stein understand your concern better.
  </p>
  <p className="my-4 text-center">
      First what medications are you currently taking?
  </p>
  <div className="flex flex-col items-end gap-y-1">
  {allMsgs.map((_msg:any) => <div className="flex w-fit bg-gray-100 pl-2 p-1 rounded-md justify-end items-center gap-x-1 mx-2">{_msg}</div>)}

  </div>
        </div>
  <div className="absolute bottom-0  w-full border-t border-black">
    {/* hello */}
    <div className="flex justify-start items-center gap-x-1 mx-2">
      <img src={patient.imageUrl} alt="" className='h-10 w-10 my-2 rounded-full'/>
    <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" className="w-full  rounded-b-3xl border-0 border-sky-600 rounded-xl px-4 py-2 focus:ring-0 focus:outline-none focus:ring-offset-0" placeholder="Type here" onKeyUp={(e) => checkIfEnterPressed(e)}/>

    </div>

          </div>

 </>
    </ChatRepeatComponent>
    )
  }

  const mySteps = [
    {
      step: 1,
      content: <Home nextStep={goToNextStep} />,
    },
    {
      step: 2,
      content: <ChoosePatient />,
    },
    {
      step: 3,
      content: <ChatPage />,
    },
    {
      step: 4,
      content: <ChatPage2 />,
    },
    {
      step: 5,
      content: "step 5",
    },
  ];
  return (
    <div className={`w-full min-h-screen ${currentStep<2 ? 'flex justify-center items-center' :''}`}>
      <div>
        {mySteps[currentStep - 1].content}
        {/* <button onClick={goToPrevStep}>Prev</button>
        <button onClick={goToNextStep}>Next</button> */}
      </div>
    </div>
  );
}
