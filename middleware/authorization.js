const authorization=(arrayofrole)=>{
    return (req,res,next)=>{
        const userrole=req.body.role;
        if(arrayofrole.includes(userrole)){
            next();
        }else{
            res.send({msg:"user not authorized"})
        }
    }
}
module.exports={authorization}