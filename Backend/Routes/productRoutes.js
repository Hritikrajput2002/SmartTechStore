const express=require('express');
const router=express.Router();
const {addProducts,getAllProducts,updateProducts,deleteProducts,getProductDetail,addReview, showReview, deleteReview}=require('../Controllers/productController.js')
const { tokenauth } = require('../Middleware/auth.js');
const { roleVerify } = require('../Middleware/roleVerify.js');



router.route('/Product/add').post(tokenauth,roleVerify,addProducts);

router.route('/Product/getall').get(getAllProducts);

router.route('/Product/update/:id').put(tokenauth,roleVerify,updateProducts);

router.route('/Product/delete/:id').delete(tokenauth,roleVerify,deleteProducts);

router.route('/Product/getProductdetail/:id').get(getProductDetail);

router.route('/Product/addreview/:id').put(tokenauth,addReview);

router.route('/Product/showreview').get(tokenauth,roleVerify,showReview);

router.route('/Product/deletereview').delete(tokenauth,roleVerify,deleteReview);



module.exports =router; 