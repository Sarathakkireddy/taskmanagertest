import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../styles/Home.css"
import Task from './Task'
import { AContext } from '../../context/acontext';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    width:'25%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(254,255,0)',
    background: 'linear-gradient(45deg, rgba(254,255,0,1) 0%, rgba(11,232,230,1) 67%, rgba(0,255,34,1) 100%)',
    borderRadius:'20px',
    fontWeight:'bolder',
  },
};

function Home() {
  const navigate=useNavigate();
  const {usersdet,Setusers,tasksdet,Settasks,load,Setload}=useContext(AContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const ctitleref=useRef();
  const cdescref=useRef();
  const ccollabref=useRef();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }
      users();
      tasks();
    
  },[load]);
  
  const users= async  ()=>{
    try{
      const res=await axios({method:"get",
        url:"https://taskmanagertest-tx8r.onrender.com/taskmanager/usersdets",
        headers:{Authorization:localStorage.token}
      });
      if(res.status===200){
        Setusers(res.data.data);
      }
    }catch(e){
      if(e.response.status===401){
        localStorage.clear();
        navigate("/");
      }else{
        console.log(e);
      }

    }
    
    
  }
  const tasks= async ()=>{
    try{
      const res=await axios({method:"get",
        url:"https://taskmanagertest-tx8r.onrender.com/tasks/alltasks",
        headers:{Authorization:localStorage.token}
      });
      if(res.status===200){
        Settasks(res.data.data);
      }
    }catch(e){
      if(e.response.status===401){
        localStorage.clear();
        navigate("/");
      }
      console.log(e);
    }
    
  }

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
function toastsuccess(msg){
  toast.success(msg, {
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
function openModal() {
  setIsOpen(true);
}

function afterOpenModal() {
}

function closeModal() {
  setIsOpen(false);
}

async function createTask(){
    try{
      const resp=await axios({
        method:"post",
        url:"https://taskmanagertest-tx8r.onrender.com/tasks/ctask",
        data:{
          title:ctitleref.current.value,
          decr:cdescref.current.value,
          collab:ccollabref.current.value,
          status:"false",
        },
        headers:{Authorization: localStorage.token}
      });
      if(resp.status===200){
        toastsuccess(`new task created ${ctitleref.current.value}`);
        closeModal();
        Setload(load+1);
      }
    }catch(e){
      if(e.response.status===401){
        toasterror("session expired Re-login");
        localStorage.clear();
        navigate("/");
      }else{
        toasterror(e);
        console.log(e);
      }
    }
}

  return (
    <>
    <div className='main-cont'>
      <div className='nav'>
        <h2 className='mainhead'>TASK MANAGER</h2>
        <button className='logoutbtn' onClick={()=>{localStorage.clear();navigate("/")}}>Logout</button>
        </div>
        <div className='task-cont'>
        <div className='addtaskdiv'><button className='addtaskbtn' onClick={()=>{openModal()}}>ADD TASK <i className="fa-solid fa-circle-plus"></i></button></div>
        <Modal isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">

        <div className='modelcont'>
            <input type='text' ref={ctitleref} className='ctitle' placeholder='Title' /><br/>
            <input type='text' ref={cdescref} className='cdesc' placeholder='Description'/><br/>
            <label className='lblcollab'>collabrator: </label>
            <select className='collabsel' ref={ccollabref}>
              <option className='uselopt'>null</option>
              {usersdet?usersdet.map((usr,index)=>{return <option className='uselopt' key={index}>{usr.email}</option>}):<></>}
              </select><br/>
            <button className='createcardbtn' onClick={()=>{createTask()}}>Create Task</button>
        </div>

      </Modal>
      <div className='taskcont'>
      {tasksdet?tasksdet.map((task,index)=>{
          return <Task task={task} key={index} toasterror={toasterror} toastsuccess={toastsuccess} load={load} Setload={Setload} navigate={navigate}/>
        }):<></>}
      </div>
        
        </div>
        <ToastContainer/>
    </div>
    </>
  )
}

export default Home