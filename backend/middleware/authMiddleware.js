const jwt = require("jsonwebtoken");
const Db = require("../config/db");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      const q=`SELECT * FROM users WHERE email ="${decoded.id}";` 
      Db.query(q,(err,data)=>{
        if(err){
            res.status(401).json({
                message:err.message
            })
            console.log(err);
        }else{
          // console.log(data);
            req.user=data[0].email;
            next();
        }
      });
      
    } catch (e) {
      res.status(401).json({
        message: e.message,
      });
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;