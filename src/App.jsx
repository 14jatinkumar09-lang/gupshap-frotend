
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


import { Login } from '../pages/Login.jsx';
import { Signup } from '../pages/Signup.jsx';
import { Home } from '../pages/Home.jsx'
import { Profile } from '../pages/Profile.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ProfileUpdate } from '../pages/ProfileUpdate.jsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUser, socketio } from '../store/ConversationUser.jsx';
import { io } from 'socket.io-client' ;


function App() {
  const loginUser = useRecoilValue(loggedInUser) ;
  const setSocket = useSetRecoilState(socketio) ;
    const navigate = useNavigate() ;

  

useEffect(()=>{
  if(!localStorage.getItem("token")) {
          navigate("/login") ;
          return ;
        }
 if (!loginUser || !loginUser._id) return;
       const s = io(import.meta.env.VITE_DB_ORIGIN_URL, {
    query: { _id: localStorage.getItem("_id") },
  });

   setSocket(s);
   
   
   return () => {
         s.disconnect();
       };


     }, [loginUser]);
    

  return <div>


    
      <Routes>
        
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileUpdate" element={<ProfileUpdate />} />

      </Routes>
   
   
  </div>

}

export default App
