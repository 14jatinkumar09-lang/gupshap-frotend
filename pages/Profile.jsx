// import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
// import { current_2nd_user, loggedInUser } from "../store/ConversationUser";
import { selectUser , setOnlineUsers } from "../redux.store/slice/userSlice/slice.user.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Profile({user}) {
// const [selectedUser , setSelectedUser] = useRecoilState(current_2nd_user)
const {selectedUser }= useSelector(state => state.user) ;
const dispatch = useDispatch() ;    // const [loginUser,setLoginUser] = useRecoilState(loggedInUser) ;
    // const [userName , setUserNameInput] = useState("") ;
    // const [fullName , setFullNameInput]  = useState("") ;

    useEffect(()=>{
        return ()=>{
            dispatch(selectUser({})) ;
        }
    } ,[])

    return <div className="flex flex-col justify-center items-center  h-screen">
        <div className="w-80 sm:w-110"> 
            <div className="  h-10 flex justify-center items-center  font-bold">
                <div>GupShap</div>
            </div>
        <div className="border font-bold border-white/10 h-[60vh]  rounded-2xl ">
        <InputBox onChange={(e)=>{
            setUserNameInput(e.target.value) ;
        }}
        label={"UserName"} placeholder={selectedUser.userName} type={"text"}></InputBox>
        <InputBox onChange={(e)=>{
            setFullNameInput(e.target.value) ;
        }}
        label={"Full Name"} placeholder={selectedUser.fullName}type={"text"}></InputBox>
        {/* <InputBox label={"Password"} placeholder={""} type={"password"}></InputBox>
        <div className="p-5 "> */}
          
{/* <button onClick={ !Object.keys(selectedUser).length ? async ()=>{
    try { 
                const res = await axios.post(`${import.meta.env.VITE_URL}/user/updateuserdeatils`, {
                    userName , fullName
                } ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log("update" , res.data.responseData.updatedUser);
             setLoginUser(res.data.responseData.updatedUser) ;
             toast.success("Details updated") ;
            
            } 
            catch (error) {
                console.log(error);
            }
} : ()=>{}}
 className={`btn ${loginUser._id !== selectedUser._id ? " hover:cursor-not-allowed" : null} w-full bg-blue-600 ` }tabIndex="-1" role="button" aria-disabled="true">
  Edit
</button>
            <div className="m-6">
        <button className="border w-full rounded-md py-2 text-white bg-red-800 hover:cursor-pointer"
        onClick={()=>{}}>
Logout
        </button>
    </div> */}
        {/* </div> */}

        </div>
        </div>
        

    </div>
}