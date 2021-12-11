require('dotenv').config();
const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const bearerToken=req?.headers?.authorization;
    console.log(bearerToken)
    if(!bearerToken || !bearerToken.startsWith('Bearer ')){
        return  res.status(400).json ({status:"failed", message:"Please provide valid Bearer token"})
    }
    const token=bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(!decoded){
        return  res.status(400).json ({status:"failed", message:"Bearer token does not match"})
    }
    req.user=decoded;
    return next();
}
module.exports=auth;