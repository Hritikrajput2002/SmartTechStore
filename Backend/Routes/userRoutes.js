const express=require('express')
const router=express.Router();
const {createUser, logoutUser,loginUser,forgotPassword, resetPassword, userDetails, updatePassword, updateprofile, showUser, showallUsers, deleteUser,islogined,addtocart, showcart, editcart}=require('../Controllers/userController');
const { tokenauth } = require('../Middleware/auth');
const { roleVerify } = require('../Middleware/roleVerify.js');



router.route('/user/create').post(createUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
router.route('/user/forgotpassword').put(forgotPassword)
router.route('/user/resetpassword/:token').post(resetPassword)
router.route('/user/userdetails').get(tokenauth,userDetails)
router.route('/user/updatepassword').post(tokenauth,updatePassword)
router.route('/user/updateprofile').put(tokenauth,updateprofile)
router.route('/user/showallusers').get(tokenauth,roleVerify,showallUsers)
router.route('/user/showuser/:id').get(tokenauth,roleVerify,showUser)
router.route('/user/deleteuser/:id').delete(tokenauth,roleVerify,deleteUser)
router.route('/user/islogined').post(islogined)
router.route('/user/addtocart/:id').put(tokenauth,addtocart)
router.route('/user/showcart').get(tokenauth,showcart)
router.route('/user/editcart/:id').put(tokenauth,editcart)











module.exports=router
