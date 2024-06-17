import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../styles/Viewtask.css'
import { AContext } from '../../context/acontext'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Commentsdisp from './Commentsdisp';

function Viewtask() {
    const{viewtask,comments,Setcomments,load,Setload}=useContext(AContext);
    const navigate=useNavigate();
    const ccmntref=useRef();
    const [reload,Setreload]=useState(1);
    let ustars=[];
    let cstars=[];
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/");
          }

          if(viewtask===""){
            navigate("/home");
          }
          try{
            
            const commentsg= async ()=>{
                const res= await axios({
                    method:"get",
                    url:`https://taskmanagertest-tx8r.onrender.com/tasks/getcomments${viewtask.taskid}`,
                    headers:{Authorization: localStorage.token},
    
                });
                if(res.status===200){
                    Setcomments(res.data.data);
                }
              }
              commentsg();
          }catch(e){
            console.log(e);
          }
          

    },[viewtask,reload]);
    
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
   
    

    async function crcomment(){
        try{
            const res=await axios({
                method:"post",
                url:"https://taskmanagertest-tx8r.onrender.com/tasks/ccmnt",
                data:{
                    taskid:viewtask.taskid,
                    comment:ccmntref.current.value,
                },
                headers:{Authorization:localStorage.token}
            });
            if(res.status===200){
                toastsuccess("commented");
                ccmntref.current.value="";
                Setreload(reload+1);
                Setload(load+1);
            }

        }catch(e){
            if(e.status===401){
                localStorage.clear();
                navigate("/");
            }else{
                console.log(e);
            }

        }
    }

    async function updaterating(choice,i){
        
            try{
                const res=await axios({
                    method:"patch",
                    url:"https://taskmanagertest-tx8r.onrender.com/tasks/updtrate",
                    data:{
                        taskid:viewtask.taskid,
                        rate:i,
                        select:choice,
                    },
                    headers:{Authorization:localStorage.token},
                });
                if(res.status===200){
                    Setreload(reload+1);
                    Setload(load+1);
                    if(choice==="u"){
                        viewtask.userrating=i;
                    }else{
                        viewtask.collabrating=i;
                    }
                }else{
                    console.log("error");
                }
            }catch(e){
                console.log(e);
            }
       
    }

    async function updatechoice(sele,choice){
        try{
            const res=await axios({
                method:"patch",
                url:"https://taskmanagertest-tx8r.onrender.com/tasks/updtchoice",
                data:{
                    taskid:viewtask.taskid,
                    choice:choice,
                    select:sele,
                },
                headers:{Authorization:localStorage.token},
            });
            if(res.status===200){
                Setreload(reload+1);
                Setload(load+1);
                if(sele==="u"){
                    viewtask.userchoice=choice;
                }else if(sele==="c"){
                    viewtask.collabchoice=choice;
                }
            }else{
                console.log("error");
            }
        }catch(e){
            console.log(e);
        }
    }

    if(viewtask&&reload){
        for(let i=0;i<5;i++){
            if(i<viewtask.userrating){
                if(viewtask.user===localStorage.id){
                    ustars.push(<i key={i} onClick={()=>{updaterating("u",i+1)}} id='selstar' className="fa-solid fa-star"></i>);
                }else{
                    ustars.push(<i key={i} id='selstar' className="fa-solid fa-star"></i>);
                }
                
            }else{
                if(viewtask.user===localStorage.id){
                    ustars.push(<i key={i} onClick={()=>{updaterating("u",i+1)}} className="fa-regular fa-star"></i>);
                }else{
                    ustars.push(<i key={i}  className="fa-regular fa-star"></i>);
                }
            }
            if(i<viewtask.collabrating){
                if(viewtask.collab===localStorage.id){
                    cstars.push(<i key={i} onClick={()=>{updaterating("c",i+1)}} id='selstar' className="fa-solid fa-star"></i>);
                }else{
                    cstars.push(<i key={i} id='selstar'  className="fa-solid fa-star"></i>);
                }
            }else{
                if(viewtask.collab===localStorage.id){
                    cstars.push(<i key={i} onClick={()=>{updaterating("c",i+1)}}  className="fa-regular fa-star"></i>);
                }else{
                    cstars.push(<i key={i}  className="fa-regular fa-star"></i>);
                }
            }
    
        }
        }
    
    return (
    <>
    <div className='viewcont'>
        <div className='vnav'><span className='bckbtn' onClick={()=>{navigate("/home")}}><i className="fa-solid fa-circle-left"></i></span> 
        <button className='lgoutbtn' onClick={()=>{localStorage.clear(); navigate("/")}}>Logout</button></div>
        <div className='vdisp'>
            <h1 className='vheadh'>{viewtask.title}</h1>
            <label className='lbldes'>Description : </label><p className='vdesc'>{viewtask.description}</p><br/>
            <label className='lblcol'>collabrator : </label><span className='vcollab'>{viewtask.collab===null?"none":viewtask.collab}</span><br/>
            <label className='lblstatus'>Status: </label><span className='vstatus'>{viewtask.completed==="true"?"Completed":"Pending"}</span><br/>
            {viewtask.completed==="true"?<><label className='lblurating'>User ratings : </label>
            {reload?ustars:<></>}<br/>
            {viewtask.collab===null?<></>:<><label className='lblcrating'>collabrator ratings : </label>
                {reload?cstars:<></>}</>}
           </>:<></>}<br/>
          {reload&&viewtask?
           <>{viewtask.user===localStorage.id?<><label>User : </label>
           {viewtask.userchoice==="0"&&reload?<><span onClick={()=>{updatechoice("u","like")}}><label> like </label><i className="fa-regular fa-thumbs-up"></i></span><span onClick={()=>{updatechoice("u","dislike")}}><label> dilike </label><i className="fa-regular fa-thumbs-down"></i></span></>:<>
           {viewtask.userchoice==="like"&&reload?<>
            <span onClick={()=>{updatechoice("u","like")}}><label> like </label><i className="fa-solid fa-thumbs-up"></i></span><span onClick={()=>{updatechoice("u","dislike")}}><label> dilike </label><i className="fa-regular fa-thumbs-down"></i></span>
           </>:<>
           <span onClick={()=>{updatechoice("u","like")}}><label> like </label><i className="fa-regular fa-thumbs-up"></i></span><span onClick={()=>{updatechoice("u","dislike")}}><label> dilike </label><i class="fa-solid fa-thumbs-down"></i></span>
           </>}
           </>}
           </>:<><label>Collabrator : </label>
           {viewtask.collabchoice==="0"&&reload?<><span onClick={()=>{updatechoice("c","like")}}><label> like </label><i className="fa-regular fa-thumbs-up"></i></span><span onClick={()=>{updatechoice("c","dislike")}}><label> dilike </label><i className="fa-regular fa-thumbs-down"></i></span></>:<>
            {viewtask.collabchoice==="like"&&reload?<>
            <span onClick={()=>{updatechoice("c","like")}}><label> like </label><i className="fa-solid fa-thumbs-up"></i></span><span  onClick={()=>{updatechoice("c","dislike")}}><label> dilike </label><i className="fa-regular fa-thumbs-down"></i></span>
           </>:<>
           <span onClick={()=>{updatechoice("c","like")}}><label> like </label><i className="fa-regular fa-thumbs-up"></i></span><span  onClick={()=>{updatechoice("c","dislike")}}><label> dilike </label><i class="fa-solid fa-thumbs-down"></i></span>
           </>}
           </>}
           </>}</>:<></>}

           <ToastContainer/>
            <div className='cmntmain'>
                
                <div className='comntsent'>
                <label className='cmntlbl'>Comments: </label><textarea className='cmttexta' ref={ccmntref} maxLength={250} rows={1}/>
                <button className='cmntpostbtn' onClick={()=>{crcomment()}}>post</button>
                </div>
                <div className='cmntsdispdiv'>
                    {comments&&load?comments.map((cmnt,index)=>{return <Commentsdisp cmnt={cmnt} index={index}/>}):<></>}
                </div>
            </div>

        </div>
        
    </div>
    </>
  )
}

export default Viewtask