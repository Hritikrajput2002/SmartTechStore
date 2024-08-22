const User=require('../Modals/user')

exports.roleVerify=async(req,res,next)=>{
    const id=req.user;
    if(!id){
        return res.status(401).json({ message:"login to access"})
    }

    const user=await User.findById(id);
    if(!user){
        return res.status(401).json({ message:" user role not found"})
    }
    if(user.role!=='admin'){
        return res.status(401).json({error:"user is not allowed to access"})
    }
    next()
    
}