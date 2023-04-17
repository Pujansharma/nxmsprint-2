const jwt =require("jsonwebtoken");
const auth=(req,res,next)=>{
    const maintoken=req.headers.authorization?.split(" ")[1];
    if(maintoken){
        jwt.verify(maintoken, process.env.jwtmaintoken, async (err, decode)=>{
            if(decode){
                next()
            }
        })
    }else{
        res.send({mssg:"please login first"})
    }
}
module.exports={auth};