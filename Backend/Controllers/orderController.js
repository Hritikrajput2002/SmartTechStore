const Order=require('../Modals/order')
const Product=require('../Modals/product')

//create order
exports.addOrder=async(req,res)=>{
    req.body.user=req.user
    req.body.paymentInfo.payat=Date.now()
    req.body.paymentInfo.status="confirmed"


    const order=await Order.create(req.body)
    if(!order)  return res.status(401).json({error:"order cant be created"})
     return res.status(201).json({status:"true",order})
}


//show single order

exports.showSingleOrder=async(req,res)=>{

    const order=await Order.findById(req.params.id).populate("user","name email")
    if(!order)  return res.status(401).json({error:"order cant be reached"})
     return res.status(201).json({status:"true",order})
}

//show  order to logged user

exports.showOrders=async(req,res)=>{

    const order=await Order.find({user:req.user})
    if(!order)  return res.status(401).json({error:"order are unavailable"})
     return res.status(201).json({status:"true",order})
}

//show  all order to admin

exports.showAllOrders=async(req,res)=>{

    const order=await Order.find()
    if(!order)  return res.status(401).json({error:"order cant be viewed"})
        
        let totalamount=0
        order.forEach(order => totalamount+=order.paymentInfo.totalprice);
     return res.status(201).json({status:"true",order,totalamount})
}


//update order status

exports.updateOrder=async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(!order)  return res.status(401).json({error:"order not exist"})


    if(order.orderStatus==="delivered")   return res.status(400).json({message:"order is already delivered"})

    order.orderItems.forEach(item => {

        updatestock(item.quantity,item.product)
        
    });

   order.orderStatus=req.body.status

   if(order.orderStatus==="delivered")  order.deliveryAt=Date.now()
    await order.save()
   
   return res.status(201).json({status:"true",order})
}

const updatestock=async(quantity,productid)=>{
    const product=await Product.findById(productid)
    product.stock=Number(product.stock)-Number(quantity)
    await product.save()
}


//delete order
exports.deleteOrder=async(req,res)=>{

    const order=await Order.findById(req.params.id)

    await order.deleteOne()

    if(!order)  return res.status(401).json({error:"order not exist"})
     return res.status(201).json({status:"true",message:"order deleted"})
}
