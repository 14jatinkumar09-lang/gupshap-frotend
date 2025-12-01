import { FaUserCircle } from "react-icons/fa";
import { UserCard } from "../components/UserCard";
import { ChatBox } from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import { useState , useRef, useEffect } from 'react' ;

import axios from 'axios' ;
import toast, { Toaster } from 'react-hot-toast';

import { createSocket , getSocket} from "../src/socket.js"





import { useDispatch, useSelector } from "react-redux";
import { fetchFilterUsers, fetchFriendUsers, fetchLoginUser } from "../redux.store/slice/userSlice/slice.user.thunk.js";
import { selectUser , setOnlineUsers } from "../redux.store/slice/userSlice/slice.user.js";
import { fetchMessages } from "../redux.store/slice/msgSlice/slice.message.thunk.js";
import { resetPage, setChats, setChatsEmpty } from "../redux.store/slice/msgSlice/slice.message.js";


export function Home() {
    
    const { allFriendUsers , loading , filterSearchUsers , loginUser , homePageLoader , selectedUser , onlineUsers } = useSelector(state => state.user) ;
    const {chats} = useSelector(state => state.message) ;
    const dispatch = useDispatch() ;





const inputRef = useRef(null);
    

        
const navigate = useNavigate() ;
const [userSearch , setUserSearch] = useState("") ;


// const [chats , setChats] = useRecoilState(allChats) ;

// console.log("chatting chats",chats);




const audio = useRef(null) ;
 
// const [s , setS]= useRecoilState(socketio);
  const s = getSocket() ;
  

  




// console.log("recoil state " , users);
useEffect ( ()=>{
    dispatch(fetchLoginUser()) ;
    dispatch(fetchFriendUsers()) ;
} ,[] )

// console.log("redux state", allFriendUsers) ;
// console.log("filterUsers redux" , filterSearchUsers);
  /////////////////////////////////////////////////









 useEffect(() => {
    if (!s) {
      const userId = localStorage.getItem('_id');
      if (userId) {
        const soc = createSocket(userId);
        // setSocket(soc);
      }
    }
  }, [s]);
  
  
  useEffect(()=>{
  
       
if(!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const soc = s || getSocket();
    if (!soc) return;






    

Notification.requestPermission().then(permission => {
  console.log("Permission:", permission); // "granted", "denied", or "default"
});

function showNotification(title, options ,sender) {
  if (Notification.permission === "granted") {
    new Notification(title, options).onclick = (e) =>{
    e.preventDefault();

    dispatch(selectUser(sender)) ;
    window.focus() ;
    // window.open() ;
  }
  }

}
 






    audio.current = new Audio('/notif.wav');  
    

    





soc.on("connect" , ()=>{
//  console.log("Socket Connected:", soc.id);
//   console.log("ID:", socket.id);
//   console.log("Status:", socket.connected);

})

soc.on("message" , (message)=>{

    
    audio.current.play() ;

        
    
    // console.log(message?.newMessage?.senderId , ":" , selectedUser?._id );
    if(message?.newMessage?.senderId !== selectedUser?._id) {
         try {
showNotification("GupShap", {
    body: `${message?.sender?.fullName} \nSent You a Message\n${message?.newMessage?.messages} `|| "You have a new message",
    icon: message?.sender?.avatar ,
  } , message?.sender);
    } catch (error) {
        // console.log(error);
    }
        return ;
    }
    dispatch(setChats(message?.newMessage)) ;  
    
    
   

})





soc.on("onlineUsers" , (OnlineUsers)=>{

    dispatch(setOnlineUsers(OnlineUsers)) ;
    
} )


return () => {
        // socket.off("onlineUsers");
        soc.off("message");
  soc.off("onlineUsers");
   
  
        
        
    };



},[s, selectedUser , onlineUsers, navigate]) ;

// console.log("array of all online users" , onlineUsers) ;




//////////////////////////////////////////////////

// console.log("chatss" , chats);


return !homePageLoader ? <div className="flex flex-col items-center sm:flex-row " >
        
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
                    <input value={userSearch}
                    ref={inputRef}
                    onChange={async (e)=>{

                        setUserSearch(e.target.value) ;
                        // console.log(userSearch);
                        if(e.target.value === "" ) return
                        dispatch(fetchFilterUsers(e.target.value)) ;

                    }}
                        type="text"
                        required
                        placeholder="Username"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength=""
                        maxlength="30"
                        title="Only letters, numbers or dash"
                    />
                </label>

            </div>


            <div className="my-2 overflow-y-scroll h-full border-2 border-white/10 ">
            {/* {filterSearchUsers?.length === 0 ? <div className="text-center"> No User Found </div> : null } */}


                {!loading ? (userSearch  ? filterSearchUsers : allFriendUsers)?.map((user) => {
                        if(user._id === loginUser._id) return ;
                    
                    return  <UserCard key={user?._id} user={user} onClick={async() => { 
                        if(selectedUser?._id === user?._id) return ;
                        await dispatch(setChatsEmpty());
                      dispatch(resetPage(2)) ;
                        // if (!selectedUser) return; 
                        await dispatch(fetchMessages({selectedUser:user})).then((res)=>{
                          res.meta.requestStatus === "rejected" ? toast.error("Time Out Check , Internet Connection")  :null
                        }) ;
                        await dispatch(selectUser(user)) ;
                        console.log("homepage" ,selectedUser);
                        // console.log("selected user",user);
                        // console.log(user);
                        // console.log(selectedUser);
                        
                      }} /> 
                      
                    }) : <div className="flex justify-center"> <span className="loading loading-bars loading-xl"></span> </div> }
                    
            </div>
            <button className=" h-20 text-blue-300 text-center hidden gap-10 items-center px-5 hover:cursor-pointer sm:block sm:flex justify-center text-2xl font-bold" 
            onClick={()=>{
                dispatch(selectUser(loginUser)) ;
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
            


    </div> : <div className="h-screen flex justify-center items-center " >  <span className="loading loading-infinity loading-10xl"></span>  </div>
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