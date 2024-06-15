const Db = require("../config/db");
const { hashed } = require("../utils/passHash");

const register= async(req,res)=>{
    try{

        
            const hashedpass=hashed(req.body.password);
            const q=`INSERT INTO users VALUES ("${req.body.fname}","${req.body.lname}","${req.body.email}","${req.body.phone}","${hashedpass}");`
                Db.query(q,(error,data)=>{
                    if(error){
                        res.status(400).json({
                            message:error,
                        });
                    }else{
                        res.status(200).json(data);
                    }
                });
                
    }catch(e){
        res.status(400).json({
            message:e,
        })
    }
    
}

module.exports=register;