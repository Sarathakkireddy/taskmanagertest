const mysql = require("mysql");
const dotenv = require("dotenv").config();

const Db= mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

Db.connect((error)=>{if(error)console.log(error);else console.log("Db conected")});

module.exports=Db;