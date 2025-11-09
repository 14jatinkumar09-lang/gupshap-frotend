import dotenv from 'dotenv' ;

import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button" 
import { useNavigate } from "react-router-dom"
import { useState } from 'react' ;
import axios from 'axios' ;
import toast, { Toaster } from 'react-hot-toast';
import {  btnLoading, loggedInUser } from '../store/ConversationUser';
import { useRecoilState, useSetRecoilState } from 'recoil';


export function Login () {
    const [btnLoad , setBtnLoad] = useRecoilState(btnLoading) ;
    const [userName,setuserName] = useState("") ;
    const [password,setPassword]  = useState("")  ;

    const login = async()=>{
        if(userName==="" || password==="") {
            toast("enter user / password")
            return ;
        }
                    try {
                        setBtnLoad(true)  ;

                        const res =  await axios.post( `${import.meta.env.VITE_URL}/user/login` , {
                            userName,password
                        })
                        toast.success("logged in ")
                        

                        
                       setBtnLoad(false) ; 
                        localStorage.setItem("token" , res.data.responseData.token) ;
                        navigate('/home') ;
                    } catch (error) {
                        
                        
                        toast.error(error.response.data.errMessage) ;
                        setBtnLoad(false) ; 

                    }
                }
    
    
const navigate = useNavigate() ;
return <div className="flex justify-center p-10">
    
    
            <div className="border-2 border-gray-200 w-110 text-center rounded-md shadow-2xl">
                <h1 className="font-bold text-xl m-2">Welcome Back</h1>
                <div>Enter your credentials to access your account </div>
                <InputBox onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        login() ;
                    }
                }}
                onChange={(e)=>{
                    setuserName(e.target.value) ;
                }} type={'text'} placeholder={"you@example..com"} label={"UserName"} />
                <InputBox onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        login() ;
                    }
                }}
                onChange={(e)=>{
                    setPassword(e.target.value) ;
                }} type={'password'} placeholder={". . . . . . . . "} label={"Password"} />

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