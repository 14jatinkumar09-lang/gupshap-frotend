import dotenv from 'dotenv' ;

import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button" 
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react' ;
import axios from 'axios' ;
import toast, { Toaster } from 'react-hot-toast';
import { socketio } from "../store/ConversationUser";
import { createSocket } from "../src/socket.js"
import { useDispatch } from 'react-redux';



export function Login () {
    const [btnLoad , setBtnLoad] = useState(false) ;

    const [userData , setUserData] = useState({
        userName : "" ,
        password : ""
    })

    function onChange(e) {
        const obj = {} ;
        obj[e.target.name] = e.target.value ;

        setUserData({ ...userData , ...obj  })
        console.log(userData);
        console.log(e.target.value);

    }

// const dispatch = useDispatch();


// useEffect(()=>{
//     if(localStorage.getItem("_id")) {
//         createSocket(localStorage.getItem("_id"));
//     }
// },[btnLoad]) ;

    // const setSocket = useSetRecoilState(socketio);
    const login = async()=>{
        if(userData.userName==="" || userData.password==="") {
            toast("enter user / password")
            return ;
        }
                    try {
                        setBtnLoad(true)  ;

                        const res =  await axios.post( `${import.meta.env.VITE_URL}/user/login` , userData)
                        toast.success("logged in ")
                        localStorage.setItem("_id" , res.data.responseData.userExist._id) ;
                        
                        
                        
    //                  const s = createSocket(!localStorage.getItem("_id"));
    // setSocket(s);

                        
                        navigate('/home') ;
                       setBtnLoad(false) ; 
                        localStorage.setItem("token" , res.data.responseData.token) ;
                    } catch (error) {
                        
                        
                        setBtnLoad(false) ; 
                        
                        toast.error(error?.response?.data?.errMessage || "Login Failed Check your Internet Connection") ;

                    }
                }
    // useEffect(()=>{
    //     if(!localStorage.getItem("token")) return ;
           
    // },[localStorage.getItem("token")])
    
const navigate = useNavigate() ;
return <div className="flex justify-center p-10">
    
    
            <div className="border-2 border-gray-200 w-110 text-center rounded-md shadow-2xl">
                <h1 className="font-bold text-xl m-2">Welcome Back</h1>
                <div>Enter your credentials to access your account </div>
                <InputBox name={"userName"} value={userData.userName}
                onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        login() ;
                    }
                }}
                onChange={onChange} type={'text'} placeholder={"you@example..com"} label={"UserName"} />
                <InputBox name={"password"} value={userData.password}
                onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        login() ;
                    }
                }}
                onChange={onChange} type={'password'} placeholder={". . . . . . . . "} label={"Password"} />

                <div className="m-6">
                    
        { !btnLoad ? <button className={` border w-full rounded-md py-2 text-white bg-blue-500 hover:cursor-pointer`}
           onClick={login} >
            Login

        </button> : 
<button class="btn">
  <span class="loading loading-spinner"></span>
  loading
</button>

         }<Toaster />
    </div>
                
                <h1 className="m-3 ">Don't have an account? <button className="text-blue-700 font-medium hover:cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</button></h1>

            </div>
            
            
</div>
}