const path=require('path');

const express=require('express');

const rootDir=require('../util/path');

const router=express.Router();
router.get('/admin-login',(req,res,next)=>{
    res.render('admin-login',{
        pageTitle:'Login',
        path:'/admin-login',

    })
})
module.exports = router;
