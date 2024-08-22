const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
   name:{
    type:String,
    required:[true,'name is compulsary']
   },
   description:{
    type:String,
    required:[true,'description is compulsary']
   },
   price:{
    type:Number,
    required:[true,'price is compulsary'],
    maxLength:[8,"price cannot exceed 8 characters"]
   },
   rating:{
    type:Number,
    default:0
   },
   image:[
    {
      image_id:{
        type:String,
        required:true  
      },
      url:{
        type:String,
        required:true
      }  
    }
   ],
   totalreview:{
    type:Number,
    default:0
   },
   review:[
    { 
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
     },
      name:{
        type:String,
        required:[true,"name is necessary"]
      },
       rating:{
        type:Number,
        required:[true,"rating is necessary"]
       },
       comment:{
        type:String,
        required:[true,"comments is necessary"]
       },
       

    }
   ],
   category:{
     type:String,
     required:[true,"category is compulsary"]
   },
   stock:{
      type:Number,
      required:[true,"no of stock is compulsary"],
      default:0
   },
   createdAt:{
      type:Date,
      default:Date.now
   },
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true
   }
})

module.exports=mongoose.model('product',productSchema);
