const Db = require("../config/db");
const generateToken = require("../utils/jwt");
const { match } = require("../utils/passHash");



const login=async (req,res)=>{
    
        const { selector,userid, password } = req.body;
        
        const que=`select * from users where email='${userid}';`;
        const quec=`select * from users where phone='${userid}';`;
        
        Db.query(selector==="email"?que:quec,(err,data)=>{
            if(err){
                res.json({
                    message:err.message, 
                }); 
            }else{
                if(!data.length){
                    res.status(400).json({message:"User not found"}); 
                }else{
                    validation(data,password,res);
                }
            } 
        });
    
};

const validation=(data,password,res)=>{
    if(match(password,data[0].password)){
        res.status(200).json({ 
            token:generateToken(data[0].email),
            id:data[0].email,
            user:data[0].fname,
        });  
    }else{
        res.status(402).json({message:"wrong password"});
    }
}

module.exports=login;