const mongoose=require("mongoose");

const blogsSchema=mongoose.Schema({
        header:String,
        topics:String,
        body:String,
        title:String
})
const blogmodel=mongoose.model("blogdata",blogsSchema);

module.exports={blogmodel};