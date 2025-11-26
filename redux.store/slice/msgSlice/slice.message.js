import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages , sendMessages } from "./slice.message.thunk";
const messageSlice = createSlice({
    name : "message" ,
    initialState : {
        chats : [] ,
        loading : false ,
    } ,
    reducers : {
        setChats : (state,action) => {
            state.chats.push(action.payload) ;
        }
    } ,
    extraReducers : (builder) => {
builder.addCase(fetchMessages.pending, (state, action) => {
            console.log("pending");
            state.loading = true ;
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.chats = action.payload ;
            state.loading = false ;
        })
        builder.addCase(fetchMessages.rejected, (state, action) => {
            console.log("rejected");
state.loading = false ;
        })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

builder.addCase(sendMessages.pending, (state, action) => {
            console.log("pending");
            
        })
        builder.addCase(sendMessages.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.chats.push(action.payload) ;
          
        })
        builder.addCase(sendMessages.rejected, (state, action) => {
            console.log("rejected");
           

        })




    }
})
export const { setChats } = messageSlice.actions;
export default messageSlice.reducer;