import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
import toast, { Toaster } from 'react-hot-toast';


export const fetchFriendUsers = createAsyncThunk('user/fetchFriendUsers' , 
    async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/user/getallusers`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            // console.log("all users that logged in user has ever talked with",res.data.responseData.users);
            
            return (res.data.responseData.users);

            } 
            catch (error) {
                console.log(error);
            }
    }
)


export const fetchFilterUsers  = createAsyncThunk( 'user/fetchFilterUser' ,
    async(searchKey)=>{
         try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/user/filterUserSearch?filter=${searchKey}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            
            
            return ( Object.values(res.data.responseData.users) ) ; 

            } 
            catch (error) {
                console.log(error);
            }
    }
)


export const fetchLoginUser = createAsyncThunk( 'user/loginuserFetch' ,
    async() => {
        try {
                const res = await axios.post(`${import.meta.env.VITE_URL}/user/getUser`, {} ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            // console.log("logged in user ",res.data.responseData.user);
            return (res.data.responseData.user);
            
            } 
            catch (error) {
                // console.log(error);
            }
    }
)


export const login = createAsyncThunk( "user/login" , 
    async(userData) => {
         try {
             
             const res =  await axios.post( `${import.meta.env.VITE_URL}/user/login` , userData , { timeout:10000})
                        // setBtnLoad(true)  ;
             
                        // toast.success("logged in ")
                        localStorage.setItem("_id" , res.data.responseData.userExist._id) ;
                        localStorage.setItem("token" , res.data.responseData.token) ;
                        // navigate('/home') ;
                        
                        return res.data.responseData ;
    //                  const s = createSocket(!localStorage.getItem("_id"));
    // setSocket(s);

                        
                    //    setBtnLoad(false) ; 
                    } catch (error) {
                        throw new Error(error?.response?.data?.errMessage);
                        
                        // return error?.response?.data?.errMessage ;
                        
                        // setBtnLoad(false) ; 
                        // toast.error(error?.response?.data?.errMessage || "Login Failed Check your Internet Connection") ;

                    }
    }
)


