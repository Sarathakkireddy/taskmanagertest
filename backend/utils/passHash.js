const bcrypt=require("bcryptjs");
const salt=bcrypt.genSaltSync(10);

const hashed=(pass)=>{
    const hashedpass=bcrypt.hashSync(pass,salt);
    return hashedpass;
};

const match=(typed_pass,hashed_pass)=>{
    return bcrypt.compareSync(typed_pass,hashed_pass);
};

module.exports={hashed,match};