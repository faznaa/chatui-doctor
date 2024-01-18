import { people } from "@/helpers/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import { useStep } from "usehooks-ts";
import AudioRecorderApp from "./AudioRecorder";
import axios from "axios";
import { toast } from "react-toastify";

const Home = ({ nextStep }: any) => (
  <div className="text-center flex flex-col ">
    <h1 className="text-4xl sm:text-9xl font-bold text-white my-2">re:surge</h1>
    <h3 className="text-3xl font-semibold text-white font-italic">
      <i> Reinventing the on-call experience.</i>
    </h3>
    <button
      onClick={() => nextStep()}
      className="mt-16 bg-white rounded-xl text-xl px-6 py-3 text-sky-900 font-semibold"
    >
      PRESS HERE TO BEGIN DEMO
    </button>
  </div>
);

const doctorImage =
  "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ChatSteps() {
  const [currentStep, helpers] = useStep(5);

  const [patientNumber, setPatientNumber] = React.useState(1);
  const [patient, setPatient] = React.useState<any>(people[0]);
  const _concerns = [
    "Fever",
    "Wound concern",
    "Pain",
    "Constipation",
    "Prescription issue",
    "Swelling",
    "Wound VAC",
    "Urinary Symptoms",
    "Drain Issues",
    "Other",
  ];

  const [selectedConcern, setselectedConcern] = React.useState<any>(null);

  const [concerns, setConcerns] = React.useState<any>(_concerns);
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_LENNY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const [report, setReport] = useState<any>({
    "preferred_contact": "Phone call",
    "summary":[
    ]

  });
  useEffect(() => {
    const person = people.find(
      (person) => person.patient_number == patientNumber
    );
    if (person) setPatient(person);
  }, [patientNumber]);
  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const [question,setQuestion] = useState("")
  const [allMsgs, setAllMsgs] = useState<any>([]);
  const start = async(response:any) => {
    const { data: res} = await axios.post(`${baseUrl}/reply`,{
      patientId:patient.full_name,
      response,
    },
    {
     headers:{
      'apiKey':process.env.NEXT_PUBLIC_SECRET_KEY_LENNY
     }
    })
    // const { data: res} = await axios.get(`${baseUrl}`)
    console.log(res)
    setQuestion(res)
    toast.info("New message from bot")
    
  } 
  const getReport = async() => {
    if(report.summary?.length > 0) return ;
    const { data: _res} = await axios.post(`${baseUrl}/report`,{
      patientId:patient.full_name,
    },{
     headers:{
      'apiKey':process.env.NEXT_PUBLIC_SECRET_KEY_LENNY
     }
    })
    console.log(_res)
    console.log("report generated")
    const { data: res} = await axios.post(`${baseUrl}/get-report`,{
      patientId:patient.full_name,
    },{
     headers:{
      'apiKey':process.env.NEXT_PUBLIC_SECRET_KEY_LENNY
     }
    })
    console.log(res)
    if(res.summary?.length > 0){
    setReport(res)
    toast.success("Report generated")
    }
    return ;

    
  }
  useEffect(() => {
    if(selectedConcern){
      console.log("SELEct",selectedConcern)
      start('start')
    }
  },[selectedConcern])
  useEffect(() => {
    if(allMsgs.length == 4){
      getReport()
    }
  },[allMsgs])
  const deleteChat = async() => {
    await axios.post(`${baseUrl}/delete`,{
      patientId:patient.full_name,
    }, {
      headers:{
        'apiKey':process.env.NEXT_PUBLIC_SECRET_KEY_LENNY
       }
    })
    setAllMsgs([])
    setQuestion("")
    setReport({
      "preferred_contact": "Phone call",
      "summary":[
      ]
  
    })
    toast.success("Chat cleared")
    await start('start')
  }
  const ChoosePatient = () => {
    const choose = (patientNumber: number) => {
      setPatientNumber(patientNumber);
      goToNextStep();
    };
    return (
      <div>
        <h1 className="text-5xl font-bold  p-6 text-white pl-20 ">
          Choose one of the following patients using
          <br /> <i>re:surge</i> to connect with their surgeon:
        </h1>
        <div className="text-center grid grid-cols-4 w-full ">
          {people.map((person) => (
            <div
              className="sm:w-[400px] sm:h-[200px] cursor-pointer my-10 flex flex-col items-center text-white justify-center"
              onClick={() => choose(person.patient_number)}
            >
              <div className="w-36 h-36 border-2 border-white overflow-hidden rounded-[50%]  bg-white flex justify-center items-center">
                <img
                  src={`/photos/${person.patient_number}.jpg`}
                  alt=""
                  className="object-cover h-40"
                />
              </div>
              <h1 className="text-2xl font-semibold">{person.first_name}</h1>
              <h3 className="text-lg font-semibold">
                POD {person.pod_day} {person.procedure}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const ChatRepeatComponent = ({ children, sidebar }: any) => (
    <div className="relative w-full flex flex-col items-center min-w-screen ">
      {/* Top left corner profile picture  */}
      <div className="absolute top-0 left-0 z-10 text-white m-4">
        <div className="flex justify-start gap-x-4">
          <div className="w-20 h-20  overflow-hidden rounded-[50%]  bg-white flex justify-center items-center">
            <img
              src={`/photos/${patient.patient_number}.jpg`}
              alt=""
              className="object-cover h-24"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{patient.full_name}</h1>
            <h3 className="text-lg">
              POD{patient.pod_day} {patient.procedure}
            </h3>
            <h3 className="text-lg">Dr.{patient.surgeon}</h3>
          </div>
        </div>
      </div>
      {/* Chatbox  */}
      <div className="w-full flex justify-around items-center mt-20">
        <div className="w-1/2 sm:max-w-md bg-white rounded-3xl  mt-20 mx-12 h-[700px] relative overflow-y-scroll">
          <div className="w-full flex items-center justify-center gap-y-4 p-4">
            <div className="w-20 h-20  overflow-hidden rounded-[50%]  bg-white flex justify-center items-center">
              <img
                src={`/photos/doctor.jpg`}
                alt=""
                className="object-cover h-24"
              />
            </div>
          </div>
          {children}
        </div>
        {/* NEXT DIV  */}
        <div className="w-1/2 flex items-center justify-center">{sidebar}</div>
      </div>
    </div>
  );

  const ChatPage = () => {
    const nextStep = (_concern: string) => {
      setselectedConcern(_concern);
      goToNextStep();
    };

    return (
      <ChatRepeatComponent sidebar={""}>
        <>
          <p className="text-center mt-3 px-2">
            Hello, {patient.first_name}!, I hope you’re doing well{" "}
            {patient.pod_day} days since your {patient.procedure} with Dr.
            {patient.surgeon}! My name is Jess and I’m a re:surge virtual
            medical assistant. I will help to collect important information
            about your concern today and urgently send it to Dr.
            {patient.surgeon} or the covering provider.{" "}
          </p>
          <p className="text-center mt-3 px-2">
            To begin, can you please select which of the following best
            describes your concern? If it’s not listed, you can choose “other”.
          </p>

          <div className="grid grid-cols-2 gap-y-3 mt-8">
            {concerns.map((concern: any) => (
              <div className="flex justify-center items-center w-full px-8 ">
                <div
                  className="bg-sky-600 rounded-2xl px-4 py-1 w-full h-14 flex justify-center items-center text-white text-center cursor-pointer"
                  onClick={() => nextStep(concern)}
                >
                  {concern}
                </div>
              </div>
            ))}
          </div>
        </>
      </ChatRepeatComponent>
    );
  };

  const ChatPage2 = () => {
    const [isMessageGeneratedVisible, setMessageGeneratedVisible] =
      useState(false);
    const [msg, setMsg] = useState("");
    const checkIfEnterPressed = async(e: any) => {
      if (e.keyCode == 13) {
        setAllMsgs([...allMsgs, msg]);
        const _msg = msg;
        setMsg("");
        start(_msg)
      }
    };
   

    return (
      <ChatRepeatComponent
        sidebar={
          isMessageGeneratedVisible ? (
            <div className="font-semibold bg-white sm:max-w-md px-4 rounded-lg h-[600px] mt-20 overflow-y-scroll">
              <div className="flex justify-end p-2 ">
                <button
                  onClick={() => setMessageGeneratedVisible(false)}
                  className="text-sky-600 font-semibold"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <br />
              <div> Name : {patient.full_name} </div>
              <div> Age : 28 </div>
              <div>Surgeon : Stein</div>
              <div> Procedure : {patient.procedure} </div>
              <div className="my-4">Chief complaint : {selectedConcern}</div>
              {report.summary?.length > 0 ? <div className="my-4">
                Summary : 
                <ul className="list-disc list-inside">
                  {report.summary.map((item:any) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div> : ''}
              <div className="my-4">
                <br />
               {report.preferred_communication ? "Contact: " + report.preferred_communication : ''}
              </div>
              <div className="my-4">
                {report.preferred_pharmacy ? "Pharmacy: " + report.preferred_pharmacy : ''}
                </div>
            </div>
          ) : (
            <div className="flex flex-col">
            <button
              className="bg-white py-4 px-2 rounded-lg"
              onClick={async() => {
                await getReport()
                setMessageGeneratedVisible(true);
              }}
            >
              Press here to see the message
              <br /> generated for the
              <br /> on-call provider
            </button>
            <button className="mt-6 bg-white py-4 px-2 rounded-lg" onClick={() => deleteChat()}>
              Clear Chat
              </button>
            </div>
          )
        }
      >
        <>
          <div className="p-4">
            <p className="text-center mt-6">
              Okay. I understand that you are concerned about {selectedConcern}
              . I will ask you a few questions to help Dr.Stein understand your
              concern better.
            </p>
            <p className="my-4 text-center">
              {question ? question : "Loading..."}
            </p>
            <div className="flex flex-col items-end gap-y-1">
              {/* get last element of allMsgs  */}
                <div className="flex w-fit bg-gray-100 pl-2 p-1 rounded-md justify-end items-center gap-x-1 mx-2">
                  {allMsgs?.length> 0 && allMsgs[allMsgs.length - 1]}
                </div>
            </div>
          </div>
          <div className="absolute bottom-0  w-full border-t border-black">
            {/* hello */}
            <div className="flex justify-between items-center relative ">
              {/* <div className="flex justify-start items-center gap-x-1 mx-2"> */}
                {/* <img src={patient.imageUrl} alt="" className='h-10 w-10 my-2 rounded-full'/> */}
                <div className="w-10 h-10 my-2  overflow-hidden rounded-[50%]  bg-white ">
                  <img
                    src={`/photos/${patient.patient_number}.jpg`}
                    alt=""
                    className="object-cover h-16"
                  />
                </div>
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  type="text"
                  className=" w-full rounded-b-3xl border-0 border-sky-600 rounded-xl px-4 py-2 focus:ring-0 focus:outline-none focus:ring-offset-0"
                  placeholder="Type here"
                  onKeyUp={(e) => checkIfEnterPressed(e)}
                />
              {/* </div> */}
              {/* <div className="mr-3  flex justify-end absolute right-2">
                <div className="w-64 bg-green-300">a</div>
                <AudioRecorderApp />
              </div> */}
            </div>
          </div>
        </>
      </ChatRepeatComponent>
    );
  };

  const mySteps =  [
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
  ]
  return (
    <div
      className={`w-full min-h-screen ${
        currentStep < 2 ? "flex justify-center items-center" : ""
      }`}
    >
      <div>

        {mySteps[currentStep - 1].content}
        {/* <button onClick={goToPrevStep}>Prev</button>
        <button onClick={goToNextStep}>Next</button> */}
      </div>
      {currentStep > 2 && (
        <div className="absolute top-0 right-0">
          <h1 className="text-white text-4xl font-bold p-6">re:surge</h1>
        </div>
      )}
    </div>
  );
}
