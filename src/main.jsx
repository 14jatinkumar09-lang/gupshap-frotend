import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, RouterProvider , createBrowserRouter} from 'react-router-dom' ;
import { Login } from '../pages/Login.jsx';
import { Signup } from '../pages/Signup.jsx' ;
import { Home } from '../pages/Home.jsx'

import { RecoilRoot } from "recoil";



createRoot(document.getElementById('root')).render(
  
<RecoilRoot >
    <BrowserRouter>
    <App />
    </BrowserRouter>
</RecoilRoot>


 
 
)
