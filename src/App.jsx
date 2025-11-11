
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

    
import { Login } from '../pages/Login.jsx';
import { Signup } from '../pages/Signup.jsx';
import { Home } from '../pages/Home.jsx'
import { Profile } from '../pages/Profile.jsx';
import { ProfileUpdate } from '../pages/ProfileUpdate.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUser, socketio } from '../store/ConversationUser.jsx';
import { io } from 'socket.io-client' ;
import axios from 'axios' ;

function App() {
 
useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const interval = setInterval(() => {
      await axios.post(`${import.meta.env.VITE_URL}/user/getUser`, {} ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
      }).catch(() => {});
    }, 240000); // every 4 minutes

    return () => clearInterval(interval);
  }, []);

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
