const jsonwebtoken=require("jsonwebtoken")
require('dotenv').config({path:'./Config/.env'});


exports.tokenauth=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token) return res.status(400).json({error:"login to acess the resource"})
    const data=await jsonwebtoken.verify(token,process.env.JWT_key)
    req.user=data.user_id;  
    next() 
}