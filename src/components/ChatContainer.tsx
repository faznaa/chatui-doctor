import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

// const messageLists = [
//     {email:'leslie.alexander@example.com',
//     chats:[
//         {message:'hi',  sender:'me'},

//     ]}
// ]

export default function ChatContainer({ people, person: email }: any) {
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [person, setPerson] = React.useState(people[0]);
  useEffect(() => {
    setPerson(people.find((p: any) => p.email == email));
  }, [email]);
  const _chats = [
    { sender: "patient", message: "Hello" },
    {
      sender: "chatbot",
      message:
        "Hi! I'm the medical record assistant. Before we update your surgery details, can I have your name, please?",
    },
    { sender: "patient", message: "My name is John Doe." },
    {
      sender: "chatbot",
      message: "Thank you, John. Can you tell me your age?",
    },
    { sender: "patient", message: "I'm 34 years old." },
    {
      sender: "chatbot",
      message:
        "Got it. Do you have any significant medical history we should be aware of?",
    },
    {
      sender: "patient",
      message: "No major medical history, just mild gastrointestinal issues.",
    },
    {
      sender: "chatbot",
      message:
        "Understood. Let's proceed to the details of your recent surgery. What type of surgery did you have? ",
    },
    {
        sender:'chatbot',
        message:'Appendectomy',
        type:"select",
        selected:true

    },
    {
        sender:'chatbot',
        message:'Gallbladder Removal',
        type:"select",
        selected:false


    },
    {
        sender:'chatbot',
        message:'Knee Replacement',
        type:"select",
        selected:false


    },
    {
        sender:'patient',
        message:'Appendectomy',

    }
    
  ];
  const [chats, setChats] = React.useState(_chats);

  const sendMessage = async () => {
    try {
      if (msg == "") return;
      setLoading(true);
      let _newChats = chats;
      setChats([..._newChats, { message: msg, sender: "patient" }]);
      _newChats.push({ message: msg,  sender: "patient" });
      setMsg("");
      setTimeout(() => {
        setChats([
          ..._newChats,
          { message: "good, thanks",  sender: "chatbot" },
        ]);
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false)
    }
  };
  return (
    <div>
      {/* Top White Bar  */}
      <div className="bg-[#023E8A] h-[60px] flex justify-between items-center px-4">
        <div className="flex min-w-0 gap-x-4">
          {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
          <div className="min-w-0 flex-auto">
            <p className="text-lg font-semibold leading-6 text-gray-100">
              {person.firstName}
            </p>
            {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p> */}
          </div>
        </div>
      </div>
      {/* Chat Container */}
      <div className="h-[calc(100vh-60px)] bg-gray-100 bg-gray-100  rounded-2xl ">
        <div
          className="flex flex-col justify-between h-full"
          //  style={{backgroundImage:'url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)'}}
        >
          {/* Background image  */}
          {/* Chat Content  */}
          <div className="h-full overflow-y-scroll">
            {chats.map((chat) => (
              <div
                className={`flex ${
                  chat.sender == "patient" ? "justify-start" : "justify-end"
                } items-center px-4 py-2 gap-x-2`}
              >
                {chat.sender == "patient" && (
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.imageUrl}
                    alt=""
                  />
                )}
                {chat.type=='select' ? <div className={`rounded-2xl ${chat.selected==false ? 'bg-white' : 'bg-blue-200' } px-4 py-2 sm:max-w-[50%] border-2 border-[#4CB0C4]  hover:bg-blue-200 cursor-pointer`}>
                    {chat.message}
                    </div>: <div className={`${chat.sender =='patient' ? 'bg-[#CAF0F8]' : 'bg-[#4CB0C4]'} rounded-2xl px-4 py-2 sm:max-w-[50%]`}>
                  {chat.message}
                </div>}
                {
                    chat.sender == 'chatbot' && chat.type!=='select' && (
                        <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src="https://www.techzim.co.zw/wp-content/uploads/2021/07/Doc-Online.jpg"
                        alt=""
                      />
                    )
                }
                {/* <div className='text-xs text-gray-400'>
                            {chat.time}
                        </div> */}
              </div>
            ))}
            {loading && (
              <div
                className={`flex justify-start items-center px-4 py-2 gap-x-2`}
              >
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.imageUrl}
                  alt=""
                />
                <div className="bg-white rounded-2xl px-4 py-2">...</div>
              </div>
            )}
          </div>
          <div className="relative mt-2 rounded-md shadow-sm m-2">
            <input
              type="text"
              name="msg"
              id="msg"
              className="block w-full pl-1 rounded-md border-0 py-1.5 pr-10 text-gray-900  placeholder:text-gray-400 focus:ring-0 focus-outline-0 sm:text-sm sm:leading-6"
              placeholder="Type a message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div
              className={`${
                msg.length > 0 ? "bg-black cursor-pointer" : "bg-transparent"
              } rounded-md  absolute inset-y-0 right-0 flex items-center px-3`}
            >
              <PaperAirplaneIcon
                onClick={() => sendMessage()}
                className="h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
