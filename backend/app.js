const express =require("express");
const cors =require("cors");
const app=express();

const accountRouter=require("./routes/accountRouter");
const taskRouter=require("./routes/taskRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/taskmanager", accountRouter);
app.use("/tasks",taskRouter);


module.exports=app;