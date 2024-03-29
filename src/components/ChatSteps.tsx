import { concerns, concerns_starting_msg, people } from "@/helpers/data";
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStep } from "usehooks-ts";
import AudioRecorderApp from "./AudioRecorder";
import axios from "axios";
import { toast } from "react-toastify";
import ImageUpload from "./UploadImage";
import Modal from "./Modal";

const BouncingDots = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="animate-bounce-fast h-2 w-2 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-bounce-fast h-2 w-2 bg-gray-300 rounded-full mr-1" style={{ animationDelay: '0.1s' }}></div>
      <div className="animate-bounce-fast h-2 w-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};
const MessageWrapper = ({ data}: any) => {
  const ref= useRef<any>(null)
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [data?.allMsgs, data?.isTyping]);
  return(
    (
      <div className="flex flex-col ">
      <ChatUI user="doctor" image='doctor'>Okay. {concerns_starting_msg.find(({concern}:any) => concern == data?.selectedConcern)?.message} I will ask you a few questions to help Dr.{" "}
        {data?.patient?.surgeon} understand your concern better.</ChatUI>
    
    
          {data?.allMsgs?.filter((msg:any) => msg.text !=='[patient uploaded the image]').map((msg:any) => msg.type=='image' ? 
          <ChatUI user={msg.user} image={data?.patient?.patient_number} id={`${msg.user}-${msg.type}-${msg?.data}`}>
            <img src={msg?.data?.length > 32 ? msg?.data : data?.report?.new_images?.find((i:any) => i._id == msg?.data)?.image} alt="Image not available at the moment" className="h-32 w-32 rounded-sm" /></ChatUI> :<ChatUI image={msg.user=='doctor' ? 'doctor' :data?.patient?.patient_number } user={msg.user}>{msg.text}</ChatUI>)}   

            {data?.isTyping && <ChatUI user="doctor" image='doctor'><BouncingDots /></ChatUI>}
            <div ref={ref} /> 

             </div> 
    )
  )
}

const Home = ({ goToNextStep }: any) => (
  <div className="text-center flex flex-col ">
    <h1 className="text-4xl sm:text-9xl font-bold text-white my-2">re:surge</h1>
    <h3 className="text-3xl font-semibold text-white font-italic">
      <i> Reinventing the on-call experience.</i>
    </h3>
    <button
      onClick={() => goToNextStep()}
      className="mt-16 bg-white rounded-xl text-xl px-6 py-3 text-sky-900 font-semibold"
    >
      PRESS HERE TO BEGIN DEMO
    </button>
  </div>
);

const ChoosePatient = ({ goToNextStep, data, updateData }: any) => {
  const choose = async (patient: any) => {
    await updateData("patientNumber", patient.patient_number);
    await updateData("patient", patient);
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
            key={person.patient_number}
            className="sm:w-[400px] sm:h-[200px] cursor-pointer my-10 flex flex-col items-center text-white justify-center"
            onClick={() => choose(person)}
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

const ChatRepeatComponent = ({ children, sidebar, data, height }: any) => (
  <div className="relative w-full flex flex-col items-center min-w-screen pb-20 ">
    {/* Top left corner profile picture  */}
    <div className="absolute top-0 left-20 z-10 text-white m-4">
      <div className="flex justify-start gap-x-4">
        <div className="w-20 h-20  overflow-hidden rounded-[50%]  bg-white flex justify-center items-center">
          <img
            src={`/photos/${data?.patient?.patient_number}.jpg`}
            alt=""
            className="object-cover h-24"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{data?.patient.full_name}</h1>
          <h3 className="text-lg">
            POD{data?.patient.pod_day} {data?.patient.procedure}
          </h3>
          <h3 className="text-lg">Dr. {data?.patient.surgeon}</h3>
        </div>
      </div>
    </div>
    {/* Chatbox  */}
    <div className="w-full flex justify-around items-center mt-20">
      <div className={`w-1/2 sm:max-w-md md:max-w-xl bg-white rounded-3xl  mt-20 mx-12 ${height} shadow-[8.0px_8.0px_8.0px_rgba(0,0,0,0.38)] shadow-2xl overflow-y-hidden relative `}>
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
const ChatUI = ({ user,children, image} : any) => (
  <div className={`w-full flex my-2 items-start ${user==='doctor' ? 'justify-start':' flex-row-reverse'}`}>
          <div className="w-8 h-8 mx-4 overflow-hidden rounded-[50%]  bg-white ">
              <img
 src={`/photos/${image}.jpg`}
                 alt=""
                className="object-cover h-12"
              />
            </div>
    <div className={`w-7/12 flex ${user=='doctor' ? 'bg-gray-100' : 'bg-blue-100'} max-w-fit pl-2 p-1 rounded-md ${user==='doctor' ? 'justify-start':'justify-end'} items-center gap-x-1 mx-2`}>
  {children}
  </div>
  </div>
 
)

const ChatPage = ({
  goToNextStep,
  data: { patient, ...data },
  updateData,
}: any) => {
  const nextStep = (_concern: string) => {
    updateData("selectedConcern", _concern);
    goToNextStep();
  };

  return (
    <ChatRepeatComponent sidebar={""} data={{ patient, ...data }} height='h-[550px]'>
      <div className="flex flex-col justify-between">
        <p className="text-center mt-3 px-4">
          Hello, {patient.first_name}! I hope you’re doing well{" "}
          {patient.pod_day} days since your {patient.procedure} with Dr. {patient.surgeon}! 
          I'll be communicating with your care team about your concern today. 
          To begin, can you please select which of the following describes your concern?
        </p>
        {/* <p className="text-center mt-3 px-2">
          To begin, can you please select which of the following best describes
          your concern? If it’s not listed, you can choose “other”.
        </p> */}

        <div className="grid grid-cols-2 gap-y-3 mt-8">
          {concerns.map((concern: any) => (
            <div className="flex justify-center items-center w-full px-8 " key={concern}>
              <div
                className="bg-sky-600 rounded-2xl px-4 py-1 w-full h-14 flex justify-center items-center text-white text-center cursor-pointer"
                onClick={() => nextStep(concern)}
              >
                {concern}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChatRepeatComponent>
  );
};

const ChatPage2 = ({
  goToNextStep,
  data,
  updateData,
  start,
  getReport,
  deleteChat,
  setImageModal
}: any) => {
  const [msg, setMsg] = useState("");
  const checkIfEnterPressed = async (e: any) => {
    if (e.keyCode == 13) {
      // setAllMsgs([...allMsgs, msg]);
      await updateData("allMsgs", [...data?.allMsgs, {text:msg, user:"patient"}]);
      const _msg = msg;
      setMsg("");
      start(_msg);
    }
  };
  const getDatebeforeNdays = (n:string) => {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(n) -1);
    return date.toDateString();
  }

  return (
    <ChatRepeatComponent
      data={data}
      height="h-[700px]"
      sidebar={
        data?.report?.summary?.length>0 ? (
          <div className="font-semibold bg-white   sm:max-w-md px-4 rounded-lg h-[600px] shadow-[8.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mt-20 overflow-y-scroll">
            <div className="flex justify-end p-2 ">
              {/* <button
                onClick={() => updateData("isMessageGeneratedVisible", false)}
                className="text-sky-600 font-semibold"
              >
                <XMarkIcon className="w-6 h-6" />
              </button> */}
            </div>
            <br />
            <div> Name : {data?.patient.full_name} </div>
            <div> Age : { data?.patient?.age} </div>
            <div>Surgeon : {data?.patient?.surgeon}</div>
            <div> Procedure : {data?.patient.procedure} </div>
            {/* Surgery date is current date - pod date  */}
            <div> Surgery date: {getDatebeforeNdays(data?.patient?.pod_day)}</div>
            <div className="my-4">
              Chief complaint : {data?.selectedConcern}
            </div>
            {data?.reportLoading ? (
              <div className="my-4">Loading report...</div>
            ) : (
              ""
            )}
            {data?.report.summary?.length > 0 ? (
              <div className="my-4">
                Summary :
                <ul className="ml-5 list-disc list-outside">
                  {data?.report.summary.map((item: any) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}

             {data?.report?.new_images?.length > 0 && <div className="my-4"> Images :</div>}
            <div className="grid grid-cols-3 gap-x-2 gap-y-3 mt-3">
            {data?.report?.new_images?.length > 0 && data?.report?.new_images?.map((image:any) => (
              <a href={image?.image} target="_blank" rel='noreferrer'>
                <img src={image?.image} alt="Not available at the moment" className="h-32 w-32 rounded-sm" />
              </a>
            ))}
            </div>
            <div className="my-4">
              <br />
              {data?.report.preferred_communication
                ? "Contact: " + data?.report.preferred_communication
                : ""}
            </div>
            <div className="my-4">
              {data?.report.preferred_pharmacy
                ? "Pharmacy: " + data?.report.preferred_pharmacy
                : ""}
            </div>
            <button
              className="mt-6 bg-black text-white py-2 px-2 rounded-lg"
              onClick={() => deleteChat()}
            >
              Clear Chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <button
              className="bg-white py-4 px-2 rounded-lg"
              onClick={async () => {
                await updateData("isMessageGeneratedVisible", true);
                await updateData("reportLoading", true);
                await getReport();
              }}
            >
              
              {data?.reportLoading ? "Loading..." :(<>Press here to see the message
              <br /> generated for the
              <br /> on-call provider<br/></>) }
            </button>
            <button
              className="mt-6 bg-white py-4 px-2 rounded-lg"
              onClick={() => deleteChat()}
            >
              Clear Chat
            </button>
          </div>
        )
      }
    >
      <>
        <div className="w-full overflow-hidden h-[520px] overflow-y-scroll ">
 {/* MESSAGEWRAPPER */}
 <MessageWrapper data={data}/>
        </div>
        <div className="absolute bottom-0  w-full border-t border-black">
          {/* hello */}
          <div className="flex justify-start items-center relative ">
            {/* <div className="flex justify-start items-center gap-x-1 mx-2"> */}
            {/* <img src={patient.imageUrl} alt="" className='h-10 w-10 my-2 rounded-full'/> */}
            <div className="w-1/12 w-10 h-10 m-2 overflow-hidden rounded-full bg-white ">
              <img
                src={`/photos/${data?.patient.patient_number}.jpg`}
                alt=""
                className="object-cover h-14 w-14"
              />
            </div>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              className="w-full disabled:bg-gray-300 rounded-b-3xl border-0 border-sky-600 rounded-xl px-4 py-2 focus:ring-0 focus:outline-none focus:ring-offset-0"
              placeholder="Type here"
              disabled={data?.isChatDisabled}
              onKeyUp={(e) => checkIfEnterPressed(e)}
            />

            <button onClick={() => setImageModal(true)} disabled={data?.isChatDisabled} className="mx-2 disabled:text-gray-300">
              <PhotoIcon className="w-6 h-6" />
            </button>
           
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

export default function ChatSteps() {
  const [data, setData] = useState<any>({
    patientNumber: null,
    patient: {},
    selectedConcern: null,
    report: {
      preferred_contact: null,
      summary: [],
    },
    allMsgs: [
    
    ],
    question: "",
    isMessageGeneratedVisible: false,
    reportLoading: false,
    isFirstMessage: false,
    isTyping: false,
    isChatDisabled: false
  });
  const [images,setImages]  = useState<any>([])

  const [currentStep, helpers] = useStep(5);
  const [imageModal, setImageModal] = useState(false);
  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_LENNY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const updateData = (key: any, value: any) => {
    setData((data:any) =>({ ...data, [key]: value }));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);


  const start = async (response: any) => {
    updateData("isTyping", true);
    const { data: res } = await axios.post(
      `${baseUrl}/reply`,
      {
        patientId: data?.patient.full_name,
        response,
        concern: data?.selectedConcern,
        phone: data?.patient.phone_number,
      },
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
        },
      }
    );
    // const { data: res} = await axios.get(`${baseUrl}`)
    console.log(res);
    updateData("question", res);
    const isLast = res.includes("Thank you for trusting re:surge with this important communication") || res.includes('calling 911.');
    updateData("isChatDisabled", isLast);
    const msgs = [{text:res, user:"doctor"}]
    updateData("isTyping", false);
    if(response !== 'start'){
      setData((data:any) => ({...data,allMsgs:[...data?.allMsgs, ...msgs]}))
    }else{
      setData((data:any) => ({...data,allMsgs:[...msgs]}))
    }
    
    toast.info("New message from bot");
  };
  useEffect(() => {
    const lastMessage = data?.allMsgs[data?.allMsgs?.length - 1];
    if (lastMessage?.user == "doctor" && (lastMessage?.text.includes("Thank you for trusting re:surge with this important communication") || lastMessage?.text.includes('calling 911.')))
     {
      updateData("isChatDisabled", true);
     }
  },[data?.allMsgs])

  const getReport = async () => {
    try{
      const { data: res } = await axios.post(
        `${baseUrl}/get-report`,
        {
          patientId: data?.patient.full_name,
        },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
          },
        }
      );
      console.log("REPORT",res);
      if (res.summary?.length > 0) {
        updateData("report", res);
      }
      if(res.images?.length > 0){
        getImages(res.images)
      }
      return res;
    }catch(err){
      console.log(err)
      toast.error("Error getting report")
    }
  }

  const generateReport = async () => {
    try {
      // setReportLoading(true)
      // if(report.summary?.length > 0) return ;
      const { data: _res } = await axios.post(
        `${baseUrl}/report`,
        {
          patientId: data?.patient.full_name,
        },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
          },
        }
      );
      console.log(_res);
      console.log("report generated");
      // toast.success("Report generated");
      await getReport();
      
      return;
    } catch (err) {
      console.log(err);
      toast.error("Error generating report");
    } finally {
      updateData("reportLoading", false);
    }
  };

  // useEffect(() => {
  //   if (data?.allMsgs.length == 4) {
  //     generateReportReport();
  //   }
  // }, [data?.allMsgs]);
  const getHistoryChat = async () => {
    const { data: res } = await axios.post(
      `${baseUrl}/messages`,
      {
        patientId: data?.patient.full_name,
      },
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
        },
      }
    );
    console.log(res);
    const msgs = res.msgs.map((i:any) => ({text:i.text, user:i.sender=='ai'?'doctor':'patient', type:i.type,data:i.data}))
    updateData("allMsgs", msgs);
    if(res.msgs.length ==  0){
      await updateData("isFirstMessage", true);
      await start("start");
    }
    return res.msgs
  }

  
  useEffect(() => {
    const reportFn = async() => {
     const msg =  await getHistoryChat()
     console.log("MSG",msg)
     if(msg.length > 0){
      const res = await getReport()
      if(!res || !res.summary || res.summary?.length == 0){
        await generateReport()
      }
     }
      
    }
    if(data?.patient?.full_name && data?.selectedConcern){
     
      // getReport()
      reportFn()
    }
  },[data?.selectedConcern])

  const getImages = async(_images:any) => {
    console.log("GETTING IMAGES")
    const images = await Promise.all(_images?.map((image:any) => {
      return new Promise(async(resolve,reject) => {
        const _data = await axios.post(`${baseUrl}/get-image`,{
            imageId:image
          },
          {headers: {
            apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
          }}
        )
        resolve(_data.data)
      })
    }))
    console.log("IMAGES",images)
    // const images = await Promise.all(_images)
    setData((data:any) => ({...data,report:{...data.report,new_images:images}}))
  }
  // useEffect(() => {
    
  //   if(data?.report?.images?.length > 0) {
  //      getImages()
  //   }
  // }, [data?.report])
  const deleteChat = async () => {
   const { data:res } = await axios.post(
      `${baseUrl}/delete`,
      {
        patientId: data?.patient.full_name,
      },
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SECRET_KEY_LENNY,
        },
      }
    );
    await updateData("allMsgs", []);
    // updateData("selectedConcern", null);
    await updateData("report", {
      preferred_contact: null,
      summary: [],
    });
    toast.success("Chat cleared");
    setTimeout(async() => {
      // Router.
      updateData("selectedConcern", null);
      setStep(2)
    },1000)
  };
  const uploadImage = async () => {
    await axios.post(`${baseUrl}/create-image`,{
      patientId: data?.patient.full_name,
      images:images
    })
    toast.success("Images uploaded")
    const _imagemsgs = images.map((image:any) => ({data:image, user:'patient', type:'image'}))
    // await updateData("allMsgs", [...data?.allMsgs, ..._imagemsgs]);
    setData((data:any) => ({...data,allMsgs:[...data?.allMsgs, ..._imagemsgs]}))
    setImages([])
    setImageModal(false)
    await start("[patient uploaded the image]")

    // setData
  }

  return (
    <div
      className={`w-full min-h-screen ${
        currentStep < 2 ? "flex justify-center items-center" : ""
      }`}
    >
      <div>
        {currentStep == 1 && <Home goToNextStep={goToNextStep} />}
        {currentStep == 2 && (
          <ChoosePatient
            goToNextStep={goToNextStep}
            data={data}
            updateData={updateData}
          />
        )}
        {currentStep == 3 && (
          <ChatPage
            goToNextStep={goToNextStep}
            data={data}
            updateData={updateData}
          />
        )}
        {currentStep == 4 && (
          <ChatPage2
            goToNextStep={goToNextStep}
            data={data}
            updateData={updateData}
            start={start}
            getReport={generateReport}
            deleteChat={deleteChat}
            setImageModal={setImageModal}
          />
        )}
      </div>
      {currentStep > 2 && (
        <div className="absolute top-0 right-0">
          <h1 className="text-white text-4xl font-bold p-6">re:surge</h1>
        </div>
      )}
      {currentStep > 1 && (
        <div className="absolute top-0 left-0 h-20">
          <h1 className="text-white text-2xl font-bold p-6 cursor-pointer">
            <ArrowLeftIcon onClick={goToPrevStep} className="w-8 h-8" />
          </h1>
        </div>
      )}
      <Modal title="Image Upload" open={imageModal} setOpen={setImageModal} >
      <>
      <ImageUpload images={images} setImages={setImages}    />
      <button className="bg-sky-600 text-white px-4 py-2 rounded-lg mt-4" onClick={() => uploadImage()}>SUBMIT</button>
      </>
      </Modal>
    </div>
  );
}
