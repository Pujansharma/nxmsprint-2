const mongoose=require("mongoose");


const blacklistSchema=mongoose.Schema({
    name:String,
})
const usermodel=mongoose.model("userdata",userSchema);

module.exports={usermodel};