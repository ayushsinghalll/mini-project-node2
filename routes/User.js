const path=require('path');

const express=require('express');

const rootDir=require('../util/path');
const userController=require('../controllers/user')

const router=express.Router();

router.get('/index',userController.getindex);
router.get('/selectlogin',userController.getselectlogin)
router.get('/user-form',userController.getuserform);
router.post('/user-form',userController.postuserform);
router.get('/user-index',userController.getuserindex);
router.get('/editprofile-user',userController.geteditprofileuser);
router.post('/editprofile-user',userController.posteditdetails);
router.get('/user-details/:houseId',userController.getuserdetails);
//router.get('/checkout',userController.getcheckout)
//router.get('/checkout/success',userController.getcheckoutsuccess)
//router.get('/checkout/cancel',userController.getcheckout)

module.exports = router;
