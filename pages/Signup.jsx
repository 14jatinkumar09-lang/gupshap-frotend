import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useState } from 'react';
import { useRecoilState } from "recoil";
import { btnLoading } from "../store/ConversationUser";

export function Signup() {
    const [btnLoad , setBtnLoad] = useRecoilState(btnLoading) ;
    
    const navigate = useNavigate(0);
    const [fullName, setFullName] = useState("");
    const [gender , setGender] = useState("") ;
   
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
     
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {
        
        if (fullName == "" || userName == "" || gender == "" || password == "" || confirmPassword == "") {
            toast("empty fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password are Not Matching  ")
            return;
        }
        
        try {
                    setBtnLoad(true) ;
                    const res = await axios.post(`${import.meta.env.VITE_URL}/user/register`, {
                        fullName,
                        userName,
                        gender  ,
                        password
                    })
                    localStorage.setItem( 'token' , res.data.responseData.token ) ;
                    if(res.status === 200) {
                            toast.success(res.data.responseData.message);
                            navigate("/home") ;
                            setBtnLoad(false) ;
                        }
                    
                } 
                
                catch (error) {
                    if (error.status == 400 || error.status == 401 || error.status == 500) {
                        
                        toast(error.response.data.errMessage);
                        setBtnLoad(false) ;
                        return;
                    }
                }



            }


    return <div className="flex justify-center p-10">
        <div className="border-2 border-gray-200 w-110 text-center rounded-md shadow-2xl">
            <h1 className="font-bold text-xl m-2">Create Account</h1>
            <div>Enter your details to create a new account</div>
            <InputBox onKeyDown={(e)=>{
                if(e.key === "Enter") {
                    register() ;
                }
            }}
            label={'Full Name'} required="true" placeholder={"Ram Lakhan"} onChange={(e) => {
                setFullName(e.target.value);
            }} ></InputBox>
            
            <InputBox onKeyDown={(e)=>{
                if(e.key === "Enter") {
                    register() ;
                }
            }}
            label={'UserName / Email'} type={"text"} placeholder={"UserName OR example@gmail.com"} onChange={(e) => {
                setuserName(e.target.value);
            }}  ></InputBox>
            <div className="flex gap-4 px-5 ">
                <label>male</label>
                <input type="radio" name="radio-1" className="radio-md " onClick={()=>{setGender("male")}}  />
                <label>female</label>
                <input type="radio" name="radio-1" className="radio-md" onClick={()=>{setGender("female")}} />


            </div>
            <InputBox onKeyDown={(e)=>{
                if(e.key === "Enter") {
                    register() ;
                }
            }}
            label={'Password'} type={"password"} placeholder={". . . . . . . ."} onChange={(e) => {
                setPassword(e.target.value);
            }}  ></InputBox>
            <InputBox onKeyDown={(e)=>{
                if(e.key === "Enter") {
                    register() ;
                }
            }}
            label={'Confirm'} type={"password"} placeholder={". . . . . . . ."} onChange={(e) => {
                setConfirmPassword(e.target.value) ;
            }} ></InputBox>
            {!btnLoad ? <Button label={"Sign Up"} onClick={register} /> : <button class="btn">
  <span class="loading loading-spinner"></span>
  loading
</button>}
            <h1 className="m-3hover:cursor-pointer">Already have an account? <button className="text-blue-700 font-medium hover:cursor-pointer" onClick={() => { navigate('/login') }}>Sign in</button></h1>
        </div>
        <Toaster />
    </div>
}