import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios'

export const fetchMessages = createAsyncThunk( 'message/fetchMessages' ,
    async({selectedUser, page} ) => {
    
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/message/get-message?receiversId=${selectedUser._id}&page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    } ,
                    timeout:60000
                });
               
                return (res.data.responseData) ;
            } catch (error) {
                console.error(error);
                throw new Error(error);
                
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
                 timeout : 10000 ,
                }  );
                return res.data.responseData ;

                
                
                } catch (error) {

                    throw new Error(error);
                    
                }
        }
)





