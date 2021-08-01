const express=require('express');

const {check,body} = require('express-validator')

const authController=require('../controllers/auth');

const router=express.Router();

router.get('/login',authController.getLogin);
router.get('/register',authController.getSignup);
router.post('/login',authController.postLogin);
router.post('/register',[
    check('email').isEmail(),
    body('password','Please enter the password minimum 6 charachter and enter number and alphates only')
        .isLength({min:5})
        .isAlphanumeric(),
    body('confirmpassword')
        .custom((value,{req})=>{
            if(value!==req.body.password){
                throw new Error('Password not match!')
            }
            return true
        }),
    body('phoneno','Your Phone Number is not correct').isNumeric().isLength({min:10,max:10})
],authController.postSignup);
router.post('/logout',authController.postLogout);
router.get('/reset',authController.getresetpassword)
router.post('/reset',authController.postresetpassword)
router.get('/reset/:token',authController.getnewpassword)
router.post('/newpassword',authController.getnewpassword)
module.exports=router;
