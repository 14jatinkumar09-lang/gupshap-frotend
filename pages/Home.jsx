import { FaUserCircle } from "react-icons/fa";
import { UserCard } from "../components/UserCard";
import { ChatBox } from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import { useState , useRef, useEffect } from 'react' ;
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios' ;
import toast, { Toaster } from 'react-hot-toast';
import {allChats, allUsers, btnLoading, current_2nd_user, loggedInUser ,msgBlink,onlineUsersArr} from '../store/ConversationUser' ;


import { io } from 'socket.io-client' ;
























export function Home() {
    


    

























const [onlineUsers , setOnlineUsers] = useRecoilState(onlineUsersArr) ;


const inputRef = useRef(null);
    const [users,setUsers] = useRecoilState(allUsers) ;
    const [filterUsers , setFilterUsers] = useState([]) ;
        
const navigate = useNavigate() ;
const [userSearch , setUserSearch] = useState("") ;
const [selectedUser,setSelectedUser] = useRecoilState(current_2nd_user) ; 
const loginUser = useRecoilValue(loggedInUser) ;
const [isSearching , setIsSearching] = useState(false) ;
const [chats , setChats] = useRecoilState(allChats) ;
const [btnLoad , setBtnLoad] = useRecoilState(btnLoading) ;
// console.log("chatting chats",chats);
const [blink,setBlink ]= useRecoilState(msgBlink) ;

const focusInput = () => {
    inputRef.current.value = "" ; 
    setIsSearching(false) ;
    // like document.getElementById(...)
  };

  const socket = useRef( null ) ;
  const audio = useRef(null) ;


  

/////////////////////////////////////////////////







// ... existing imports and state declarations

useEffect(() => {
    // 1. Authentication check
    if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
    }

    // 2. Request Notification Permission (Good practice, keep it)
    Notification.requestPermission().then(permission => {
        console.log("Permission:", permission);
    });

    // Notification function (Keep it)
    function showNotification(title, options) {
        if (Notification.permission === "granted") {
            new Notification(title, options).onclick = (e) => {
                e.preventDefault();
                window.focus();
            };
        }
    }

    // Audio setup (Keep it)
    audio.current = new Audio('/notif.wav');

    // 3. Socket Connection
    // Check if the user is logged in before connecting
    if (!loginUser?._id) return;
    
    // Disconnect any existing socket before creating a new one (Optional, but safer for re-runs)
    if (socket.current) {
        socket.current.disconnect();
    }
    
    socket.current = io(import.meta.env.VITE_DB_ORIGIN_URL,
        {
            query: {
                _id: loginUser?._id,
            }
        }
    );

    // 4. Socket Listeners
    socket.current.on("connect", () => {
        console.log("Socket connected, ID:", socket.current.id);
    });

    socket.current.on("message", (message) => {
        audio.current.play();

        try {
            showNotification("GupShap", {
                body: `${message?.sender?.fullName} \nSent You a Message\n  ${message?.newMessage?.messages}` || "You have a new message",
                icon: message?.sender?.avatar,
            });
        } catch (error) {
            console.log(error);
        }

        // Only update chats if the message is from the currently selected user
        if (message?.newMessage?.senderId === selectedUser?._id) {
             setChats(prev => [...prev, message?.newMessage]);
        }
        // Note: You might need logic here to update a message counter/indicator 
        // for users who are *not* currently selected.
    });

    socket.current.on("onlineUsers", (OnlineUsers) => {
        setOnlineUsers(OnlineUsers);
    });

    // 5. Cleanup Function: The Crucial Part
    return () => {
        // This runs on component unmount or before the effect runs again
        if (socket.current) {
            socket.current.off("message"); // Remove listeners
            socket.current.off("onlineUsers");
            socket.current.disconnect(); // Disconnect the socket
            console.log("Socket disconnected.");
        }
    };

}, [loginUser?._id, navigate, selectedUser?._id, setChats, setOnlineUsers]); // Added necessary dependencies

// console.log("array of all online users" , onlineUsers) ;




//////////////////////////////////////////////////

// console.log("chatss" , chats);


return <div className="flex flex-col items-center sm:flex-row " >
        
{/* hidden sm:block */}
        <div className="part1 sm:h-screen sm:w-[35vw]  h-[50vh] w-[80vw] xl:w-[50vw] lg:w-[50vw]  md:w-[50vw] border-2 border-white/10 flex flex-col justify-between">

            <div className="bg-gray-600  h-10 flex  justify-center items-center font-bold">
                <div>GupShap</div>
            </div>
            <div className=" h-10 w-full ">
                <label className="input validator w-full ">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input ref={inputRef}
                    onChange={async (e)=>{
                        setUserSearch(e.target.value) ;
                        if(userSearch === "") {
                            setIsSearching(false) ;
                            return ;
                        }
                
                        setTimeout(async() => {
                            
                            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/user/filterUserSearch?filter=${userSearch}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setIsSearching(true) ;
            // console.log(isSearching);
            setFilterUsers( Object.values(res.data.responseData.users) ) ; 

            } 
            catch (error) {
                // console.log(error);
            }
                        }, 100);
                        

                    }}
                        type="text"
                        required
                        placeholder="Username"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="30"
                        title="Only letters, numbers or dash"
                    />
                </label>

            </div>
            <div className="my-2 overflow-y-scroll h-full border-2 border-white/10 ">
                {(isSearching ? filterUsers : users)?.map((user) => {
                    if(isSearching) {
                        if(user._id === selectedUser._id) return ;
                    }
                    return user?.userName !== loginUser?.userName  ? <UserCard key={user._id} user={user} onClick={() => { 
                        setSelectedUser(user) ;
                        focusInput() ;
                        let once = ()=>{
                            if(Object.keys(selectedUser).length === 0) {
                                return;
                            }
                            setUsers([ selectedUser , ... users  ]) ;
                            once = ()=>{} ;
                        }
                        isSearching ? once(): null ;

                    }} /> : ""
                })}
            </div>
            <button className=" h-20 text-blue-300 text-center hidden gap-10 items-center px-5 hover:cursor-pointer sm:block sm:flex justify-center text-2xl font-bold" 
            onClick={()=>{
                setSelectedUser(loginUser) ;
                navigate("/profileUpdate") ;
            }}>

                 <div>
                    <div className="avatar avatar-online">
  <div className="w-10 rounded-full">
    <img src={loginUser?.avatar} />
  </div>
</div>
                 </div>
<div >{loginUser?.fullName}</div>
            </button>
            {/* <div className="hidden">{toast.success("logged in")} <Toaster /></div> */}

        </div>
        

        <div className="part2 border border-white/10 w-full sm:h-screen  h-[50vh] " >
        
<ChatBox user={selectedUser}  />


             </div>
            


    </div>
}















// try {
//                                 const res = await axios.get(`${import.meta.env.VITE_URL}user/filterUserSearch?filter=${userSearch}` , {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 }
//             }) ;
//                         setUsers(res.data.responseData.users) ;
//                         console.log(res.data.responseData.users) ;
                        

                                
//                             } catch (error) {
//                                 console.log(error) ;
//                             }
