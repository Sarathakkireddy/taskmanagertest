import React, { useContext} from 'react'
import '../../styles/Task.css'
import axios from 'axios'
import { AContext } from '../../context/acontext';

function Task({task,index,toasterror,toastsuccess,load,Setload,navigate}) {
    const{Setviewtask}=useContext(AContext);
    let like=0;
    let dislike=0;
    let ustars=[];
    let cstars=[];

    async function deletetask(){
        try{
            const res= await axios({
                method:"delete",
                url:`https://taskmanagertest-tx8r.onrender.com/tasks/dtask${task.taskid}`,
                headers:{Authorization: localStorage.token},

            });
            if(res.status===200){
                toasterror(`Deleted the ${task.title} task`);
                Setload(load+1);
            }
        }catch(e){

        }
    };
    async function updatetask(){
        try{
            const res=await axios({
                method:"patch",
                url:"https://taskmanagertest-tx8r.onrender.com/tasks/updttask",
                data:{
                    taskid:task.taskid,
                    completed:task.completed==="true"?"false":"true",
                },
                headers:{Authorization:localStorage.token},
            });
            if(res.status===200){
                Setload(load+1);
            }else{
                console.log("error");
            }
        }catch(e){
            console.log(e);
        }
        
    }
    
    if(load>0){
        for(let i=0;i<5;i++){
            if(i<task.userrating){
                ustars.push(<i key={i} id='selstar' className="fa-solid fa-star"></i>);
            }else{
                ustars.push(<i key={i} className="fa-regular fa-star"></i>);
            }
            if(i<task.collabrating){
                cstars.push(<i key={i} id='selstar' className="fa-solid fa-star"></i>);
            }else{
                cstars.push(<i key={i} className="fa-regular fa-star"></i>);
            }
    
        }
    }
    if(load){
        like=0;
        dislike=0;
        if(task.userchoice==="like"){
            like++;
        }else if(task.userchoice==="dislike"){
            dislike++;
        }
        if(task.collabchoice==="like"){
            like++;
        }else if(task.collabchoice==="dilike"){
            dislike++;
        }
    }
   
  return (
    <>
    <div className='taskdiv'  >
        <div onClick={()=>{updatetask()}} className={task.completed==="true"?"tskcmp":"tskncmp"}>{task.completed==="true"?<span><i className="fa-regular fa-square-check"></i><br/>COMPLETED</span>:<span><i className="fa-regular fa-square"></i><br/>NOT COMPLETED</span>}</div>
        <div className='taskcard' onClick={()=>{Setviewtask(task);navigate("/viewtask")}}>
        {task.completed==="true"?<s>
            <h2 className='tsktitle'>{task.title}</h2>
        <div className='tskdesc'><label className='bl'>Description : </label>{task.description}</div>
        {task.collab===null?<></>:<div className='tskcollab'><label className='bl'>collabrator: </label>{task.collab}</div>}
        
        {task.completed==="true"?<><span className='tskurating'><label className='bl'>user rating</label>{load>0?ustars:<></>}</span><br/></>:<></>}
        {task.completed==="true"?task.collab===null?<></>:<><span className='tskcrating'><label className='bl'>collabrator rating</label>{load>0?cstars:<></>}</span><br/></>:<></>}
        
        <span className='tsklikes'><label className='bl'>likes</label>{like}</span><br/>
        <span className='tskdislikes'><label className='bl'>dislikes</label>{dislike}</span><br/>
        <div className='tskuser'><label className='bl'>Created by: </label>{task.user}</div>
        </s>:<>
        <h2 className='tsktitle'>{task.title}</h2>
        <div className='tskdesc'><label className='bl'>Description : </label>{task.description}</div>
        {task.collab===null?<></>:<div className='tskcollab'><label className='bl'>collabrator: </label>{task.collab}</div>}
        
        {task.completed==="true"?<><span className='tskurating'><label className='bl'>user rating</label>{load>0?ustars:<></>}</span><br/></>:<></>}
        {task.completed==="true"?task.collab===null?<></>:<><span className='tskcrating'><label className='bl'>collabrator rating</label>{load>0?cstars:<></>}</span><br/></>:<></>}
        
        <span className='tsklikes'><label className='bl'>likes</label>{like}</span><br/>
        <span className='tskdislikes'><label className='bl'>dislikes</label>{dislike}</span><br/>
        <div className='tskuser'><label className='bl'>Created by: </label>{task.user}</div>
        </>}
        </div>
       
        
        {task.user===localStorage.id?<span className='tskdel' onClick={()=>{deletetask()}}><i className="fa-solid fa-trash"></i></span>:<></>}
    </div>
    </>
  )
}

export default Task