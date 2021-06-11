const express=require('express');

const authController=require('../controllers/auth');

const router=express.Router();

router.get('/admin-login',authController.getLogin);
router.get('/admin-registration',authController.getSignup);
router.post('/admin-login',authController.postLogin);
router.post('/admin-registration',authController.postSignup);
router.post('/admin-logout',authController.postLogout);

module.exports=router;
