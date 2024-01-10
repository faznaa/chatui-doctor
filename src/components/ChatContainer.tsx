import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'

// const messageLists = [
//     {email:'leslie.alexander@example.com',
//     chats:[
//         {message:'hi',  sender:'me'},


//     ]}
// ]

export default function ChatContainer({ people, person:email }:any) {
    const [msg,setMsg] = React.useState('')
    const [loading,setLoading] = React.useState(false)
    const [person,setPerson] = React.useState(people[0])
    useEffect(() => {
        setPerson(people.find((p:any) => p.email == email))
    },[email])
    const _chats = [
        {message:'hi', time:'12:00', sender:'me'},
        {message:'hello', time:'12:01', sender:'them'},
        {message:'how are you?', time:'12:02', sender:'me'},
        {message:'good, you?', time:'12:03', sender:'them'},
        {message:'good, thanks', time:'12:04', sender:'me'},
        {message:'good, thanks', time:'12:04', sender:'me'},
        {message:'hows your family', time:'12:04', sender:'me'},
        {message:'good, thanks', time:'12:04', sender:'me'},
    ]
    const [chats,setChats] = React.useState(_chats)

  const sendMessage = async() => {
    try{
        if(msg=='') return
        setLoading(true)
        let _newChats = chats
        setChats([..._newChats,{message:msg, time:'12:06', sender:'me'}])
        _newChats.push({message:msg, time:'12:06', sender:'me'})
        setMsg('')
        setTimeout(() => {
            setChats([..._newChats,{message:'good, thanks', time:'12:04', sender:'them'}])
            setLoading(false)
        },3000);
    }catch(err){
        console.log(err)
    }finally{
        // setLoading(false)
    }
  }
  return (
    <div>
        {/* Top White Bar  */}
        <div className='bg-white h-[60px] flex justify-between items-center px-4'>
        <div className="flex min-w-0 gap-x-4">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
        </div>
        {/* Chat Container */}
        <div className='h-[calc(100vh-60px)] bg-gray-100 bg-gray-100  rounded-2xl '>
        <div className='flex flex-col justify-between h-full'
        //  style={{backgroundImage:'url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)'}}
         >
            {/* Background image  */}
            {/* Chat Content  */}
            <div className='h-full overflow-y-scroll'>
                {chats.map((chat) => (
                    <div className={`flex ${chat.sender!='me' ? 'justify-start' : 'justify-end'} items-center px-4 py-2 gap-x-2`}>
                        {chat.sender == 'them' && <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> }
                        <div className='bg-white rounded-2xl px-4 py-2'>
                            {chat.message}
                        </div>
                        {/* <div className='text-xs text-gray-400'>
                            {chat.time}
                        </div> */}
                    </div>
                ))}
                {loading && <div className={`flex justify-start items-center px-4 py-2 gap-x-2`}><img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /><div className='bg-white rounded-2xl px-4 py-2'>...</div></div>}
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
        <div className={`${msg.length>0 ? 'bg-black cursor-pointer' : 'bg-transparent'} rounded-md  absolute inset-y-0 right-0 flex items-center px-3`}>
          <PaperAirplaneIcon onClick={() => sendMessage()} className="h-5 w-5 text-gray-200" aria-hidden="true" />
        </div>

      </div>
      </div>
      
             
        </div>
    </div>
  )
}
