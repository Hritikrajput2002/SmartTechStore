const mongoose=require("mongoose");

const  connectToDatabase=async()=>{
        try{
            await mongoose.connect(process.env.Mongo_URI);
            console.log("connected succesfullly")
        }
        catch(err){
                    console.log("db  failed connect")
        }
    } 
module.exports= connectToDatabase;       