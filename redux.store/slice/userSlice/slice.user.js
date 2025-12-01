import { createSlice } from "@reduxjs/toolkit";
import { fetchFriendUsers , fetchFilterUsers , fetchLoginUser, login } from "./slice.user.thunk";
const userSlice = createSlice({
    name : "user" ,
    initialState : {
        homePageLoader : false ,
        loginUser : {} ,
        allFriendUsers : [] ,
        loading : false ,
        filterSearchUsers : [] ,
        selectedUser : null ,
        filterSearchRedux : "" ,
        onlineUsers : []

    } ,
    reducers : {
        selectUser : (state,action)=>{
            state.selectedUser = { ...action.payload} ;
        } ,
        setOnlineUsers : (state , action )=>{
            state.onlineUsers = action.payload ;
        }
    } ,
    extraReducers : (builder) => {
        builder.addCase(fetchFriendUsers.pending, (state, action) => {
            console.log("pending");
            state.loading = true ;

        })
        builder.addCase(fetchFriendUsers.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.allFriendUsers = action.payload ;
            state.loading = false ;
        })
        builder.addCase(fetchFriendUsers.rejected, (state, action ) => {
            console.log("rejected");
            
state.loading = false ;
        })





//////



builder.addCase(fetchFilterUsers.pending, (state, action) => {
            console.log("pending");
            state.loading = true ;

        })
        builder.addCase(fetchFilterUsers.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.filterSearchUsers = action.payload ;
            state.loading = false ;
        })
        builder.addCase(fetchFilterUsers.rejected, (state, action) => {
            console.log("rejected");
state.loading = false ;
        })




        //////
builder.addCase(fetchLoginUser.pending, (state, action) => {
            console.log("pending");
            state.homePageLoader = true ;

        })
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.loginUser = action.payload ;
            state.homePageLoader = false ;
        })
        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            console.log("rejected");
state.homePageLoader = false ;
        })

//////////////////////////////



builder.addCase(login.pending, (state, action) => {
            console.log("pending");
            state.loading = true;

        })
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.loading = false ;
   
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log("rejected");
            state.loading = false ;
        })

    }
})



export const { selectUser , setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;