const express=require('express');
const cors=require('cors')
require('dotenv').config({path:'./Config/.env'});
const app=express();
const connectToDatabase=require('./Config/database.js')
const auth=require("./Routes/userRoutes.js")
const product=require('./Routes/productRoutes.js')
const user=require('./Routes/userRoutes.js')
const order=require('./Routes/orderRoutes.js')
const cookieParser = require('cookie-parser');




//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//connecting to database
connectToDatabase()


app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)


app.listen(process.env.port,()=>{
   console.log(`server is listening at  http://localhost:${process.env.port}`)
})