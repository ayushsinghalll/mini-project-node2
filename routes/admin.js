const path=require('path');

const express=require('express');

const rootDir=require('../util/path');
const admincontroller=require('../controllers/admin')

const router=express.Router();

router.get('/add-landlord',admincontroller.getaddlandlord)
router.post('/add-landlord',admincontroller.postaddlandlord)



module.exports = router;
