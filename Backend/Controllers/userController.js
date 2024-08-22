const User=require("../Modals/user")
const bcrypt=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
const sendEmail=require("../Utils/sendEmail.js")
require('dotenv').config({path:'./Config/.env'});


//create user

exports.createUser=async(req,res)=>{
    try{
        if (!req.body.email || !req.body.password) return res.status(400).json({ error: "Please provide email and password" })
        const user=await User.findOne({email:req.body.email})
        if(user) return res.status(400).json({error:"user already exist"})
        const salt=await bcrypt.genSalt(10)
        const encryptPass=await bcrypt.hash(req.body.password,salt)
        req.body.password=encryptPass
        const newUser=await User.create(req.body)
        const data={
            user_id:newUser.id
        }
        const token=jsonwebtoken.sign(data,process.env.JWT_key, { expiresIn: '1h' })
        return res.status(200).json(token)
    }
    catch{
        res.status(400).json("internal server error")

    }    
}


 // login user

exports.loginUser=async(req,res)=>{
    
    try{
        if (!req.body.email || !req.body.password) return res.status(400).json({ error: "Please provide email and password" })
        const user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({error:"user does not exist"})
        const isMatch= await bcrypt.compare(req.body.password,user.password)
        if(!isMatch) return res.status(400).json({error:"wrong credential"}) 
        const data={
          user_id:user.id
        }
        const token=jsonwebtoken.sign(data,process.env.JWT_key, { expiresIn: '1h' })
        return res.status(200).cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        }).json(token)
    }
     catch{
        res.status(400).json("internal server error")
     }
}



//logout user

exports.logoutUser=(req,res)=>{
    res.cookie('token',null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0
    }).status(200).json({success:true,message:"successfully logged out"})
}


//forgotpassword 

exports.forgotPassword=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(401).json({error:"user not found"})

    }
    const salt=await bcrypt.genSalt(10)
    const hashedToken = await bcrypt.hash(salt, 10);
    const encodedToken = encodeURIComponent(hashedToken);

    user.resetpasswordtoken=hashedToken
    user.resetpasswordexpire=Date.now() +  15*60*1000 
    await user.save({ validateBeforeSave: false });
    
    const resetpasswordUrl=`http://localhost:5000/api/v1/user/resetpassword/${encodedToken}`
    const message=` Your reset password link is :- \n\n ${resetpasswordUrl} \n\n If not requested then, ignore` 
    
    try{

        await sendEmail({
            email:user.email,
            subject: "Ecommerce Password Recovery",
            message
        })
          return res.status(202).json({success:true,   message:`Email send to ${user.email} successfully`  })   
    }
    catch(err){
        user.resetpasswordtoken=undefined
        user.resetpasswordexpire=undefined 
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again later.",
        });
    }
}

//resetpassword

exports.resetPassword=async(req,res)=>{
    
    if(req.body.password!==req.body.confirmpassword)  return res.status(401).json({error:" Entered passwords must be same"})

    const  user=await User.findOne({resetpasswordtoken:req.params.token, resetpasswordexpire:{ $gt:Date.now()} })

    if(!user)return res.status(401).json({error:"User not found or session expired"})
    
   
        const salt=await bcrypt.genSalt(10)
    const encryptPass=await bcrypt.hash(req.body.password,salt)
    user.password=encryptPass
    user.resetpasswordtoken=undefined
    user.resetpasswordexpire=undefined 
    user.save()
    return res.status(201).json({succes:"true",message:"user password updated"})

}



//user details

exports.userDetails=async(req,res)=>{
    const user=await User.findById(req.user);
    if(!user) return res.status(401).json({error:"user not found"})
    return  res.status(201).json(user)
}


//update password

exports.updatePassword=async(req,res)=>{
    if(req.body.oldpassword===req.body.newpassword)  return res.status(401).json({error:" New passwords must be different fron old"})

    if (req.body.newpassword!==req.body.confirmpassword)  return res.status(401).json({error:" Entered   new passwords must be same"})
  
    const user=await User.findById(req.user);

    if(!user)return res.status(401).json({error:"User not found"})
        
    const isMatch=await bcrypt.compare(req.body.oldpassword,user.password) 
    if(!isMatch) return res.status(401).json({error:"wrong credential"}) 

    const salt=await bcrypt.genSalt(10)
    const encryptPass=await bcrypt.hash(req.body.newpassword,salt)
    user.password=encryptPass
    user.save()
    return  res.status(201).json({success:"true",message:"User password updated"})

}


//update profile
 
exports.updateprofile=async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.user,req.body,{new:true,runValidators:true});
    if(!user) return res.status(401).json({error:"user not found"})
    return  res.status(201).json(user)
}


//show all user-admin

exports.showallUsers=async(req,res)=>{
    const user=await User.find()
    if(!user) return res.status(401).json({error:"users not found"})
    return  res.status(201).json(user)

}

//show single user-admin

exports.showUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user) return res.status(401).json({error:"users not found"})
    return  res.status(201).json(user)

}

//delete user -admin
exports.deleteUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    console.log(user)
    if(!user) return res.status(401).json({error:"users not exist"})
    await user.deleteOne()
    return res.status(201).json({
        success:"true",
        desc:"user removed"
})
}


