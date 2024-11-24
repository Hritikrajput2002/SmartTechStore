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
        return res.cookie('token',token, {
            httpOnly: true,
            secure: true,     // Set to true if using HTTPS in production
            sameSite: 'none', 
            maxAge: 3600000
        }).status(200).json("token generated")
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
        return res.cookie('token',token, {
            httpOnly: true,
            secure:true,     // Set to true if using HTTPS in production
            sameSite: 'none', 
            maxAge: 3600000
        }).status(200).json("token generated")
    }
     catch{
        res.status(400).json("internal server error")
     }
}



//logout user

exports.logoutUser=(req,res)=>{
    return res.cookie('token','', {
        httpOnly: true,
        secure: true,
        sameSite: 'none', 
        maxAge: 0
    }).status(200).json({success:true,message:"successfully logged out"})
}


//is loginned
exports.islogined=async(req,res)=>{
    const { token } = req.cookies;
    if (!token) {
        return res.status(200).json({ success: false });
    }
    try {
        const data = await jsonwebtoken.verify(token, process.env.JWT_key);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
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
    
    const resetpasswordUrl=`http://localhost:3000/resetpassword/${encodedToken}`
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
    const user=await User.findById(req.user).select('-password');
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



//add to cart
exports.addtocart=async(req,res)=>{
    const {quantity}=req.body
    const productid=req.params.id
    
    if(quantity <= 0) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
      }

    let user=await User.findById(req.user)
    if(!user){
          return res.status(400).json("user cant be reached at the moment")       
    }
    if (!Array.isArray(user.cartitems)) {
        user.cartitems = [];
      }
    const isadded=await user.cartitems.find(rev=> rev.productid.toString()===productid.toString())
    if(isadded){
            user.cartitems.forEach(rev => {
                   if(rev.productid.toString()===productid.toString()) {
                    rev.quantity=Number(rev.quantity)+Number(quantity)
                   }
            });    
    }else{
            user.cartitems.push({
                productid:productid,
                quantity:quantity
                
    })
}
 await user.save()


    return res.status(200).json({
            success:"true",
            desc:"product added to cart"
    })
}




//show cart
exports.showcart=async(req,res)=>{
    const user=await User.findById(req.user)

    if(!user){
            return res.status(401).json({ error:"user not found "})      
    }
    return res.status(201).json(user.cartitems)      
    
}


//edit cart
exports.editcart=async(req,res)=>{
    const {quantity}=req.body
    const productid=req.params.id
    
    if(quantity < 0) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
      }

    let user=await User.findById(req.user)
    if(!user){
          return res.status(400).json("user cant be reached at the moment")       
    }
  
    if(quantity==0){
        user.cartitems = user.cartitems.filter(rev => rev.productid.toString() !== productid.toString());
    } 
    else{
        user.cartitems.forEach(rev => {
            if(rev.productid.toString()===productid.toString()) {
            rev.quantity=Number(quantity)
            }
    }); 
    } 

 await user.save()


    return res.status(200).json({
            success:"true",
            desc:"cart product edited "
    })
}
