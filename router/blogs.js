const express = require("express");
const { blogmodel } = require("../model/blogs.modal");
const {authorization}=require("../middleware/authorization")
const blogrouter = express.Router();



blogrouter.get("/allblogs", async(req,res)=>{
let query=req.query;
try {
    const users= await blogmodel.find(query);
    res.status(200).send(users)
} catch (error) {
    console.log(error.message)
}
})


blogrouter.post("/adddata", async(req,res)=>{
    let payload=req.body;
    try {
        let data= new blogmodel(payload);
        await data.save();
        res.status(200).send({msg:"data has been added",data:data})
    } catch (error) {
        console.log(error)
    }
});

blogrouter.patch("/update/id:", authorization,async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    try {
        let data= await blogmodel.findByIdAndUpdate({_id:ID},payload);
        res.status(200).send({msg:"data has been added",data:data})
    } catch (error) {
        console.log(error)
    }
})


blogrouter.delete("/delete/id:", authorization,async(req,res)=>{
    const ID=req.params.id;
    try {
         await blogmodel.findByIdAndDelete({_id:ID});
        res.status(200).send({msg:"data has been deleted"})
    } catch (error) {
        console.log(error)
    }
})


module.exports={blogrouter}