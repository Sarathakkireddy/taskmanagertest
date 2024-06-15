import React, { useRef } from 'react'
import '../styles/Loginpane.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Loginpane({Setlogintype,toast}) {
    const lemailref=useRef();
    const lpassref=useRef();
    const navigate = useNavigate();

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

    function validEmail(email) {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(validRegex)) {
          return true;
        } else {
          return false;
        }
      }

    function validate(){
        if(!(lemailref.current.value)){
            toasterror("Enter Email/mobile");
            return false;
        }else if(!(lpassref.current.value)){
            toasterror("Enter Password");
            return false;
        }else {
            return true;
        }
    }

    async function loginproc(){
        try{
        const res=await axios({method:"post",
          url:"http://localhost:4000/taskmanager/login",
          data:{
            selector:validEmail(lemailref.current.value)?"email":"phone",
            userid:lemailref.current.value,
            password:lpassref.current.value,
          }
        });
        if(res.status===200){
          // console.log(res);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("user",res.data.user);
            navigate("/home", { replace: true });
        }
    }catch(e){
        toasterror(e.response.data.message);
        // console.log(e);
    }
    }
  return (
    <>
    <input className='log' ref={lemailref} type='text' placeholder='Email ID / Phone Number'/><br/>
    <input className='log' ref={lpassref} type='password' placeholder='Password'/><br/>
    <button onClick={()=>{if(validate()){loginproc()}}} className='lbtn'>LOGIN</button><br/>
    <span className='slink' onClick={()=>{Setlogintype('SIGNUP')}}>SIGNUP/REGISTER</span>
    </>
  )
}

export default Loginpane