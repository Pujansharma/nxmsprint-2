const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
        name:String,
        email:String,
        password:String,
        role:{type:String,enum:["user","Moderator"],default:"user"}
})
const usermodel=mongoose.model("userdata",userSchema);

module.exports={usermodel};