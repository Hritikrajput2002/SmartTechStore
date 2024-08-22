const mongoose =require('mongoose')
const validator=require('validator')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is compulsary to enter "],
        maxLenth:[30,"name should not exceed 30 characters"],
        minLenth:[3,"name should be greater 3 characters"]
    },
    email:{
        type:String,
        required:[true,"email is compulsary to enter"],
        validate:[validator.isEmail,"enter the valid email"],
        unique:true
    },
    password:{
        type:String,
        minLenth:[6,"password should be greater 3 characters"],
        required:true
    },
    avatar:{
        image_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetpasswordtoken:{
        type:String
    },
    resetpasswordexpire:{
        type:Date
    }
})

module.exports=mongoose.model("user",userSchema);