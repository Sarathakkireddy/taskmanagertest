const Db = require("../config/db")

const userdets=async (req,res)=>{
    try{
        
        const q=`SELECT fname,lname,email,phone FROM users WHERE email NOT LIKE'${req.user}';`
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

module.exports=userdets;