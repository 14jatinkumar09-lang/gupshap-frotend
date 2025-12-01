import { useEffect, useState ,useRef, useCallback, useLayoutEffect } from 'react';
import { UserCard } from "./UserCard";
import { IoSend } from "react-icons/io5";


import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessages } from '../redux.store/slice/msgSlice/slice.message.thunk';
import { resetPage, setChats } from '../redux.store/slice/msgSlice/slice.message';


export function ChatBox( user ) {
    console.log("top",user);
    const messageRef = useRef(null) ;
    const chatBox = useRef(null) ;
    // const selectedUser = useRecoilValue(current_2nd_user);
    // const [chats,setChats] = useRecoilState(allChats) ;
    const [msgInput,setMsgInput] = useState('') ;
 
    const navigate = useNavigate() ;
    const inputRef = useRef(null) ;
    
    const dispatch = useDispatch() ;
    

    const  { chats,page } = useSelector(state => state.message)  
    const  chatsLoading  = useSelector(state => state.message.loading)  
    const { allFriendUsers , loading , filterSearchUsers , loginUser , homePageLoader , selectedUser } = useSelector(state => state.user) ;
    

    
    useEffect(()=>{

        messageRef?.current?.scrollIntoView({ block : "end"}) ;

    } , [selectedUser]) ;
    useEffect(()=>{

        messageRef?.current?.scrollIntoView({ behavior : "smooth"}) ;

    } , [chats]) ;


    const fetchOlderMsg = ()=> {
        chatBox.current.addEventListener("scroll", async () => {
        console.log("older function page : "  ,page);
        if(!selectedUser) return ;
         console.log("selectedUser in older function"  ,selectedUser);
        const scrollTop = chatBox.current.scrollTop ;
        if(scrollTop === 0) {
            
            
            await dispatch(fetchMessages({selectedUser , page:page })).then(async (res)=>{
                res.meta.requestStatus === "rejected" ? toast.error("Time Out Check , Internet Connection")  : null 
            }) ;
                        
        }
    } );
    }
   
    
   useEffect(()=>{
       ChatBox?.current?.addEventListener("scroll", fetchOlderMsg);
       return () => {
        
        ChatBox?.current?.removeEventListener("scroll", fetchOlderMsg);
    }
   },[page,selectedUser])

useEffect(()=>{
    inputRef.current.focus() ;
},[])




    const  sendingMsg = async()=>{
        
        
        if(!msgInput) {
            return ;
        }
        setMsgInput("") ;
                
                if(Object.keys(selectedUser).length === 0) {
                    toast.error("Select a User") ;
                    return ;
                }
// console.log("selected user before dispatch" , selectedUser);

                await dispatch(sendMessages({msgInput , selectedUser})).
                then((res)=>{
                    res?.meta?.requestStatus !== "fulfilled" ? toast.error("Not sent , check internet connection") :null ;;
                }) ;
                
               
                
                
                inputRef.current.focus() ;
                 
            }
    


   

   

    return <div  className="flex flex-col justify-between h-full  ">
        <div className= {` ${!selectedUser?._id ? "hidden" : "1" } border border-white/10 flex gap-2 `} >

            <UserCard onClick={async()=>{
                // console.log("clicked");
                if(Object.keys(selectedUser).length) {
                    navigate('/profile') ;
                }
            }} user={selectedUser} /><button onClick={()=>{

                navigate(`/conference/${selectedUser?.fullName}`)
            }}
            >call</button>
            
        </div>

        {!selectedUser?._id ? <div className=' h-full flex flex-col items-center justify-end p-5'> 
            {/* <h1>Welcome to GupShap </h1>  */}
        <div>Select a User to continue..</div> 
        </div> : <></>}

        <div ref={chatBox}
        className='flex flex-col justify-start overflow-y-scroll'>



            {!chatsLoading ? chats?.map((chat)=>{
                return <div  ref={messageRef} key={chat?._id} className={`chat  ${!selectedUser?._id ? "hidden" : null}   ${chat?.senderId === loginUser?._id ? "chat-end" :"chat-start" } `}>
                    
                <div className="chat-header">
                    {chat?.senderId === loginUser._id ? loginUser?.fullName : selectedUser?.fullName}
                    <time className="text-xs opacity-50">{dayjs(chat?.createdAt).format("hh:mm A")}</time>
                </div>
                <div onContextMenu={()=>{

                }}
                className="max-w-[40%] break-words whitespace-normal chat-bubble">{chat?.messages}</div>
                {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div> 
            }) : <div className='flex justify-center'><span className="loading loading-infinity loading-xl"></span></div>}




        </div>
        <div className="flex gap-2 m-1">
             <input ref={inputRef}
             onKeyDown={(e)=>{
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