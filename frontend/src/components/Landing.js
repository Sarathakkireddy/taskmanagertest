import React, { useEffect, useState } from 'react'
import Loginpane from './Loginpane'
import Register from './Register'
import '../styles/Landing.css'
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Landing() {
    const [logintype,Setlogintype]= useState('LOGIN');
    // useEffect(()=>{
    //   localStorage.clear();
    // },[]);
  return (
    <div className='landing-div'>
        <h1 className='landing-title'>TASK MANAGER</h1>
        <div className='login-register-pane'>
            <h2 className='logintyp'>{logintype}</h2>
            {logintype==='LOGIN'?
            <Loginpane Setlogintype={Setlogintype} toast={toast}/>:<Register Setlogintype={Setlogintype} toast={toast}/>}
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Landing