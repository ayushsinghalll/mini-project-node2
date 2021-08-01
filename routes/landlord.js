const path=require('path');

const express=require('express');

const rootDir=require('../util/path');
const landlordController=require('../controllers/landlord')

const router=express.Router();
router.get('/landlordlogin',landlordController.getlandlordlogin)
router.post('/landlordlogin',landlordController.postlandlordlogin)
router.get('/landlord-form',landlordController.getlandlordform);
router.post('/landlord-form',landlordController.postlandlordform)
router.get('/landlord-index',landlordController.getlandlordindex);
router.get('/add-house',landlordController.getaddhouse);
router.get('/edit-house',landlordController.getedithouse);
router.post('/add-house',landlordController.postaddhouse);
router.get('/update-house/:houseId',landlordController.getupdatehouse);
router.post('/update-house',landlordController.postupdatehouse);
router.post('/delete-house',landlordController.postdeletehouse);
router.get('/landlord-editdetails',landlordController.getlandlordeditdetails);





module.exports = router;
