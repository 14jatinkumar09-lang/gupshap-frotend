// import { atom, selector, useRecoilValue } from 'recoil';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client' ;
// // const navigate = useNavigate() ;



// export const allUsers = atom({
//     key: "existedUsers",
//     default: selector({
//         key: "existingConvoUsers",
//         get: async () => {
//             // try {
//             //     const res = await axios.get(`${import.meta.env.VITE_URL}/user/getallusers`, {
//             //     headers: {
//             //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             //     }
//             // });
//             // // console.log("all users that logged in user has ever talked with",res.data.responseData.users);
//             // return (res.data.responseData.users);

//             // } 
//             // catch (error) {
//             //     console.log(error);
//             // }
//         }
//     })
// })


// export const current_2nd_user = atom({
//     key: "currentfe user",
//     default: {}


// })



// export const loggedInUser = atom({
//     key: "loogedinufdfser",
//     default: selector({
//         key: "selectorforfeuserget",
//         get: async () => {
//             //  try {
//             //     const res = await axios.post(`${import.meta.env.VITE_URL}/user/getUser`, {} ,{
//             //     headers: {
//             //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             //     }
//             // });
//             // // console.log("logged in user ",res.data.responseData.user);
//             // return (res.data.responseData.user);
            
//             // } 
//             // catch (error) {
//             //     // console.log(error);
//             // }
            
//         }
//     }),
// })



// export const onlineUsersArr = atom({
//     key:"oonlineUsersArr" ,
//     default : [] ,
// })




// export const allChats = atom ( {
//     key : "socket new message recieved" ,
//     default : [] ,
// })


// export const btnLoading = atom({
//     key : "btnload" ,
//     default : false ,
// })



// export const msgBlink = atom({
//     key:"blink" ,
//     default : {
        
//     } ,
// })



// export const socketio = atom({
//     key:"socket" ,
//     default :  null ,
// dangerouslyAllowMutability: true, 
// })


// // export const socketio = atom({
// //     key:"socket" ,
// //     default :  io(import.meta.env.VITE_DB_ORIGIN_URL , 
// //     {
// //         query : {
// //             _id : localStorage.getItem("_id") ,
// //         }
// //     }
// // ) ,
// // dangerouslyAllowMutability: true, 
// // })