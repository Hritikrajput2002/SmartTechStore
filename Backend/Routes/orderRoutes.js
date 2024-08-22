const express=require('express');
const { addOrder, showSingleOrder, showOrders, showAllOrders, updateOrder, deleteOrder } = require('../Controllers/orderController');
const router=express.Router();
const { tokenauth } = require('../Middleware/auth.js');
const { roleVerify } = require('../Middleware/roleVerify.js');



router.route('/order/add').post(tokenauth,addOrder)

router.route('/order/showsingleorder/:id').get(tokenauth,showSingleOrder)

router.route('/order/showorders').get(tokenauth,showOrders)

router.route('/order/showallorders').get(tokenauth,roleVerify,showAllOrders)

router.route('/order/updateorder/:id').put(tokenauth,roleVerify,updateOrder)

router.route('/order/deleteorder/:id').delete(tokenauth,roleVerify,deleteOrder)







module.exports=router