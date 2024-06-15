const express = require("express");
const {gettasks, createtasks, deletetask, getcomments, createcomment, deletecomment, updatetask, updaterating, updatechoice} = require("../controllers/tasks");
const protect = require("../middleware/authMiddleware");

const router=express.Router();

router.get("/alltasks",protect,gettasks);
router.post("/ctask",protect,createtasks); 
router.delete("/dtask:id",protect,deletetask);
router.get("/getcomments:id",protect,getcomments);
router.post("/ccmnt",protect,createcomment);
router.delete("/del:id",protect,deletecomment);
router.patch("/updttask",updatetask);
router.patch("/updtrate",updaterating);
router.patch("/updtchoice",updatechoice);

module.exports=router;