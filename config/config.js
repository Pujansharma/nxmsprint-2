const mongoose=require("mongoose");
require("dotenv").config()
const connections=mongoose.connect(process.env.mongodbUrl);



module.exports={connections};