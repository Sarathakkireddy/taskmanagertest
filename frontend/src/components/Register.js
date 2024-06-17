import React, { useRef } from 'react'
import '../styles/Register.css'
import axios from 'axios';

function Register({Setlogintype,toast}) {
  const fnameref=useRef();
  const lnameref=useRef();
  const emailref=useRef();
  const phoneref=useRef();
  const pwdref=useRef();
  const cnfpwdref=useRef();

  function toasterror(msg){
    toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
}

  async function signupproc(){
    try{
      const resp=await axios({
        method:"post",
        url:"https://taskmanagertest-tx8r.onrender.com/taskmanager/register",
        data:{
          fname: fnameref.current.value,
          lname: lnameref.current.value,
          email:emailref.current.value,
          phone:phoneref.current.value,
          password:pwdref.current.value,
        },
      });
    if(resp.status===200){
      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Setlogintype('LOGIN')
    }else{
      console.log(resp);
      toasterror(resp.message);
      fnameref.current.value="";
      lnameref.current.value="";
      emailref.current.value="";
      phoneref.current.value="";
      pwdref.current.value="";
      cnfpwdref.current.value="";
    }
    }catch(e){
      toasterror(e.response.data.message);
      fnameref.current.value="";
      lnameref.current.value="";
      emailref.current.value="";
      phoneref.current.value="";
      pwdref.current.value="";
      cnfpwdref.current.value="";
    }

  }

  function validEmail(email) {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  function validate(){
    console.log(phoneref.current.value.length);
    if(!(fnameref.current.value||lnameref.current.value||phoneref.current.value||emailref.current.value||pwdref.current.value||cnfpwdref.current.value)){
        toasterror("Enter all feilds");
        return false;
    }else if(!validEmail(emailref.current.value)){
        toasterror("not a valid email");
        return false;
    }else if(pwdref.current.value!==cnfpwdref.current.value){
        toasterror("Password not matched");
        return false;
    }else if(!(phoneref.current.value.length===10)){
      toasterror("Enter valid mobile number");
      return false;
    }else{
        return true; 
    }
}

  return (
    <>
    <input ref={fnameref} className='sign' type='text' placeholder='First Name'/><br/>
    <input ref={lnameref} className='sign' type='text' placeholder='Last Name'/><br/>
    <input ref={emailref} className='sign' type='email' placeholder='Email id'/><br/>
    <input ref={phoneref} className='sign' type='number' placeholder='Mobile Number'/><br/>
    <input ref={pwdref} className='sign' type='password' placeholder='Enter Password'/><br/>
    <input ref={cnfpwdref} className='sign' type='password' placeholder='confirm Password'/><br/>
    <button onClick={()=>{if(validate()){signupproc()}}} className='sbtn'>SIGN UP</button><br/>
    <span className='slink' onClick={()=>{Setlogintype('LOGIN')}}>Login</span>

    </>
  )
}

export default Register