import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios'

export const fetchMessages = createAsyncThunk( 'message/fetchMessages' ,
    async(selectedUser) => {
    
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/message/get-message?receiversId=${selectedUser._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
               
                return (res.data.responseData.messages) ;
            } catch (error) {
                console.log("some error",error);
            }
        }
)



export const sendMessages = createAsyncThunk( 'message/sendMessages' ,
    async({msgInput , selectedUser}) => {
   console.log("user argument after dispatch ",selectedUser);
            try {
                    const res = await axios.post(`${import.meta.env.VITE_URL}/message/send-message?receiversId=${selectedUser._id}` ,
                        {
                        message : msgInput ,
                    },
                    {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    } , 
                 timeout : 7000 ,
                }  );
                return res.data.responseData ;

                
                
                } catch (error) {
                    
                   
                    
                    throw new Error(error);
                    
                }
        }
)