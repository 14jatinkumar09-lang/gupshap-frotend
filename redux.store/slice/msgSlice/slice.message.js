import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages , sendMessages } from "./slice.message.thunk";
const messageSlice = createSlice({
    name : "message" ,
    initialState : {
        chats : [] ,
        loading : false ,
        page : 1 ,
    } ,
    reducers : {
        setChats : (state,action) => {
            state.chats.push(action.payload) ;
        } ,
        setChatsEmpty : (state,action) => {
            state.chats = [];
        } ,
        resetPage : (state,action) => {
            state.page = action.payload ;
        }
    } ,
    extraReducers : (builder) => {
builder.addCase(fetchMessages.pending, (state, action) => {
            console.log("pending");
            
            state.loading = true ;
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            console.log("fullfiled");
            if(action.payload.pageEnd) {
                console.log("returned ");
                state.loading = false ;
                state.page = state.page + 1 ;
                return;
            }
            console.log("cant stop me i am reducer" , action.payload.pageEnd);
            
            // state.page = state.page+1 ;
            state.chats = [ ...action.payload.messages , ...state.chats ].filter((msg, index, self) =>
    index === self.findIndex(m => m._id === msg._id) // unique by ID
); ;
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
export const { setChats , setChatsEmpty , resetPage } = messageSlice.actions;
export default messageSlice.reducer;