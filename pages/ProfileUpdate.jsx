import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { btnLoading, current_2nd_user, loggedInUser } from "../store/ConversationUser";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from 'axios' ;
import { useNavigate } from "react-router-dom";

import { useSelector , useDispatch } from "react-redux";
import { selectUser } from "../redux.store/slice/userSlice/slice.user";






export function ProfileUpdate () {
    const navigate = useNavigate() ;
    
    
    
    const [userName , setUserNameInput] = useState("") ;
    const [fullName , setFullNameInput]  = useState("") ;
    const [avatar , setAvatar]  = useState("") ;
    const [details , setDetails] = useState({}) ;
    const [btnLoad , setBtnLoad] = useRecoilState(btnLoading) ;


    const { allFriendUsers , loading , filterSearchUsers , loginUser , homePageLoader , selectedUser , onlineUsers } = useSelector(state => state.user) ;
    const dispatch = useDispatch() ;
        useEffect(()=>{
            return ()=>{
                 dispatch(selectUser({})) ;
            }
        },[])

        
function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value && String(value).trim() !== "")
  );
}

        async function sendUpdateReq() {

            
            
            const data = removeEmpty({
                userName , fullName , avatar
            }) ;

            console.log(data);
            
            
            try {
                setBtnLoad(true) ;
                const res = await axios.post(`${import.meta.env.VITE_URL}/user/updateuserdeatils` , {data} , {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` ,
                    }
                })
                setBtnLoad(false) ;
                toast.success("Profile Updated") ;
                // window.location.reload() ;
            } catch (error) {
                setBtnLoad(false) ;

                toast.error(error.response.data.errMessage) ;
            }
        } 


    return <div className="flex flex-col justify-center items-center  h-screen">
            <div className="w-80 sm:w-110"> 
                <div className="  h-10 flex justify-center items-center  font-bold">
                    <div>GupShap</div>
                </div>
            <div className="border font-bold border-white/10 h-[60vh]  rounded-2xl ">
            <InputBox onChange={(e)=>{
                setUserNameInput(e.target.value) ;
            }}
            label={"UserName"} placeholder={loginUser?.userName} type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setFullNameInput(e.target.value) ;
            }}
            label={"Full Name"} placeholder={loginUser?.fullName}type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setAvatar(e.target.value) ;
            } }
            label={"My Avatar"} placeholder={"Paste the link of your avatar ...."} type={"text"}></InputBox>
            <div className="p-5 ">
              
    {!btnLoad?<button onClick={()=>{
        const input = prompt("Type Confirm To Update Details") ;
        if(input.toLowerCase() === "confirm") {
            sendUpdateReq() ;
        }
        else {
            toast.error("Profile Not Updated") ;
        }
    }}
     className={`btn  null w-full bg-blue-600 ` }tabIndex="-1" role="button" aria-disabled="true">
      Update My Deatails
    </button> :  <div className="flex justify-center">
        <button  class="btn">
  <span class="loading loading-spinner"></span>
  loading
</button></div>}
                <div className="m-6">
            <button className="border w-full rounded-md py-2 text-white bg-red-800 hover:cursor-pointer"
            onClick={()=>{
                localStorage.removeItem("token") ;
                navigate("/login") ;
                window.location.reload() ;
            }}>
    Logout
            </button>
        </div>
            </div>
    
            </div>
            </div><Toaster />
            
    
        </div>
}