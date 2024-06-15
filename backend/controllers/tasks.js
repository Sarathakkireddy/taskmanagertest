const Db = require("../config/db")

const gettasks=async (req,res)=>{
    try{
        const q=`select * from tasks where user = "${req.user}" or collab = "${req.user}";`
        Db.query(q,(err,data)=>{
            if(err){
                res.status(400).json({
                    message:err,
                });
            }else{
                res.status(200).json({
                    data:data,
                })
            }
        })
    }catch(e){
        res.status(400).json({
            message:e,
        });
    }
}

const createtasks=async (req,res)=>{
       
        const {title,decr,collab,status,likes,dislikes}=req.body;
        // if(collab==="null"){
        //     collab=null;
        // }
        const q=`INSERT INTO tasks (user,title,description,collab,completed) values('${req.user}','${title}','${decr}','${collab}','${status}');`;
        const qu=`INSERT INTO tasks (user,title,description,completed) values('${req.user}','${title}','${decr}','${status}');`;
        Db.query(collab==="null"?qu:q,(err,data)=>{
            if(err){
                console.log(err);
                res.status(400).json({
                    message:err.message,
                });
            }else{
                res.status(200).json({
                    data:data,
                });
            }
        })

}

const deletetask=async(req,res)=>{
    const q=`DELETE FROM tasks WHERE taskid=${req.params.id}`;
    Db.query(q,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err,
            });
        }else{
            res.status(200).json({
                data:data,
            });
        }
    })
}

const updaterating=async(req,res)=>{
    const q=`UPDATE tasks SET userrating=${req.body.rate} WHERE taskid = ${req.body.taskid};`;
    const qu=`UPDATE tasks SET collabrating=${req.body.rate} WHERE taskid = ${req.body.taskid};`;
    Db.query(req.body.select==="u"?q:qu,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err,
            });
        }else{
            res.status(200).json({
                data:data,
            });
        }
    })
}

const updatechoice=async(req,res)=>{
    const q=`UPDATE tasks SET userchoice="${req.body.choice}" WHERE taskid=${req.body.taskid};`;
    const qu=`UPDATE tasks SET collabchoice="${req.body.choice}" WHERE taskid=${req.body.taskid};`;
    Db.query(req.body.select==="u"?q:qu,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err,
            });
        }else{
            res.status(200).json({
                data:data,
            });
        }
    })
}

const updatetask=async(req,res)=>{
    const q=`UPDATE tasks SET completed="${req.body.completed}" WHERE taskid = ${req.body.taskid};`;
    Db.query(q,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err,
            });
        }else{
            res.status(200).json({
                data:data,
            });
        }
    })
}

const getcomments=async(req,res)=>{
    const q=`SELECT * FROM comments WHERE taskid="${req.params.id}";`;
    Db.query(q,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err.message,
            })
        }else{
            res.status(200).json({
                data:data,
            })
        }
    });
}

const createcomment=async(req,res)=>{
    const {taskid,comment}=req.body
    const q=`INSERT INTO comments VALUES ('${taskid}','${comment}','${req.user}');`;
    Db.query(q,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err.message,
            })
        }else{
            res.status(200).json({
                data:data,
            })
        }
    })
}

const deletecomment=async(req,res)=>{ 
    const q=`DELETE FROM comments WHERE taskid=${req.params.id};`;
    Db.query(q,(err,data)=>{
        if(err){
            res.status(400).json({
                message:err.message,
            })
        }else{
            res.status(200).json({
                data:data,
            })
        }
    })
}

module.exports={gettasks,createtasks,deletetask,getcomments,createcomment,deletecomment,updatetask,updaterating,updatechoice};