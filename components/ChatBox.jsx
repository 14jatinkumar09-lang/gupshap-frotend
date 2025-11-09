import { useEffect, useState ,useRef } from 'react';
import { UserCard } from "./UserCard";
import { IoSend } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from 'recoil';
import { allChats, current_2nd_user, loggedInUser, msgBlink } from '../store/ConversationUser';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";


export function ChatBox({ user }) {
    const messageRef = useRef(null) ;
    const selectedUser = useRecoilValue(current_2nd_user);
    const [chats,setChats] = useRecoilState(allChats) ;
    const [msgInput,setMsgInput] = useState('') ;
    const [send , setSend ]  = useState(0) ;
    const loginUser = useRecoilValue(loggedInUser) ;
    const navigate = useNavigate() ;
    const [blink , setBlink ] = useRecoilState(msgBlink) ;
    
    useEffect(()=>{
        if(messageRef.current) {
            messageRef.current.scrollIntoView({ behavior : "smooth"}) ;
        }
    })
// console.log(chats);
    const sendingMsg = async()=>{
                if(!msgInput) {
                    return ;
                }
                if(Object.keys(selectedUser).length === 0) {
                    toast.error("Select a User") ;
                    return ;
                }

                try {
                    const res = await axios.post(`${import.meta.env.VITE_URL}/message/send-message?receiversId=${selectedUser._id}` ,
                        {
                        message : msgInput ,
                    },
                    {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }  );

                // setChats([...chats , res.data.responseData.newMessage])
                setMsgInput("") ;
                setSend(send+1) ;
                
                } catch (error) {
                    toast.error("Not sent , check internet connection") 
                }
            }
    


    useEffect(() => {
        async function fetchData() {
            if(!selectedUser.fullName) {
                return ;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/message/get-message?receiversId=${selectedUser._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setChats(res.data.responseData.messages) ;
                // console.log("fetchData function ",chats);
            } catch (error) {
                // console.log("some error",error.response);
            }
        }
        fetchData() ;

    }, [selectedUser,send]);

   

    return <div  className="flex flex-col justify-between h-full  ">
        <div className= {` ${Object.keys(user).length === 0 ? "hidden" : "1" } border border-white/10 flex gap-2`} >

            <UserCard onClick={async()=>{
                // console.log("clicked");
                if(Object.keys(selectedUser).length) {
                    navigate('/profile') ;
                }
            }} user={selectedUser} />
        </div>

        {!user._id ? <div className=' h-full flex flex-col items-center justify-end p-5'> 
            {/* <h1>Welcome to GupShap </h1>  */}
        <div>Select a User to continue..</div> 
        </div> : <></>}

        <div className='flex flex-col justify-start overflow-y-scroll'>



            {chats.map((chat)=>{
                return <div  ref={messageRef} key={chat?._id} className={`chat  ${Object.keys(selectedUser).length === 0 ? "hidden" : null}   ${chat.senderId === loginUser._id ? "chat-end" :"chat-start" } `}>
                    
                <div className="chat-header">
                    {chat?.senderId === loginUser._id ? loginUser.fullName : selectedUser.fullName}
                    <time className="text-xs opacity-50">{dayjs(chat.createdAt).format("hh:mm A")}</time>
                </div>
                <div className="chat-bubble">{chat.messages}</div>
                {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div> 
            })}




        </div>
        <div className="flex gap-2 m-1">
             <input onKeyDown={(e)=>{
                if(e.key === "Enter") {
sendingMsg() ;
                }
            }} type="text" className="input w-full" placeholder="Type here" value={msgInput} onChange={(e)=>{
                setMsgInput(e.target.value) ;
            }} />
            <button className="border border-white/10 w-10 flex justify-center items-center  " 
            onClick={sendingMsg}
            > <IoSend /> </button><Toaster/>
           
        </div>
    </div>
}