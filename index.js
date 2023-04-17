const express= require("express");
const {connections}=require("./config/config");
const {userrouter}=require("./router/user.router")
const {auth}=require("./middleware/auth.middleware")
const {blogrouter}=require("./router/blogs")
require("dotenv").config()
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/user",userrouter)
app.use(auth);
app.use("/blog",blogrouter)



app.listen(process.env.port,async()=>{
    try {
        await connections;
        console.log("connected to database")
    } catch (error) {
        console.log((error.message))
    }
    console.log("server is running on port 4500")
})