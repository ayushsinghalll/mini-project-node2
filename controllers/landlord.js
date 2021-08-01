const House=require('../models/landlord')
const bcrypt=require('bcryptjs')
const LandLordForm=require('../models/landlordform')
const Landlordreg=require('../models/landlordreg')
exports.getlandlordlogin=(req,res,next)=>{
    res.render('LandLord/landlordlogin',{
        pageTitle:'LandLord Form',
        path:'/LandLord/landlordlogin'
    })
}

exports.postlandlordlogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    Landlordreg.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.redirect('/landlord-index')
            }
            bcrypt.compare(password,user.password)
                .then(doMatch=>{
                    if(doMatch){

                        req.session.isLoggedIn = true
                        req.session.user = user
                        return req.session.save(err => {
                            console.log(err)
                            res.redirect('/user-index')
                        })

                    }
                    res.redirect('/login')

                })
                .catch(err=>{
                    console.log(err)
                    res.redirect('/login')
                })

        })
        .catch(err=>{
            console.log(err)
        })

}

exports.getlandlordform=(req,res,next)=>{
    res.render('LandLord/landlord-form',{
        pageTitle:'LandLord Form',
        path:'/LandLord/landlord-form'
    })
}

exports.postlandlordform=(req,res,next)=>{
    const FirstName=req.body.FirstName
    const LastName=req.body.LastName
    const phoneno=req.body.phoneno
    const IdType=req.body.IdType
    const IdNumber=req.body.IdNumber
    const address=req.body.address
    const city=req.body.city
    const state=req.body.state
    const zip=req.body.zip
    const oldpassword=req.body.oldpassword
    const newpassword=req.body.newpassword
    const confirmpassword=req.body.confirmpassword

    const landlord =new LandLordForm({
        FirstName:FirstName,
        LastName:LastName,
        phoneno:phoneno,
        IdType: IdType,
        IdNumber: IdNumber,
        address:address,
        city: city,
        state: state,
        zip: zip,
        oldpassword: oldpassword,
        newpassword: newpassword,
        confirmpassword: confirmpassword,

        /*userId:req.user._id*/
    })
    landlord
        .save()
        .then(result=>{
            console.log("Form Submitted successfully")
            res.redirect('/landlord-index')

        })
        .catch(err=>{
            console.log(err)
        })
}




exports.getlandlordindex=(req,res,next)=>{
    House.find()
        .then(house=>{
            console.log(house)
            res.render('Landlord/landlord-index',{
                prods:house,
                pageTitle:'LandLord',
                path:'/landlord-index'
            })
        })
        .catch(err=>{
            console.log(err)
        })
}




exports.getaddhouse=(req,res,next)=>{
    res.render('LandLord/add-house',{
        pageTitle:'Add House',
        path:'/LandLord/add-house',
        editing:false
    })
}

exports.postaddhouse=(req,res,next)=>{
    const HouseName=req.body.HouseName;
    const Colony=req.body.Colony;
    const Street=req.body.Street
    const City=req.body.City
    const District=req.body.District
    const Pincode=req.body.Pincode
    const Price=req.body.Price

    const house=new House({HouseName:HouseName, Colony:Colony,Street:
        Street,City:City, District: District, Pincode:Pincode, Price:Price,/*userId:req.user._id*/})
    house
        .save()
        .then(result=>{
            console.log('Created Product');
            res.redirect('/add-house')
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getedithouse=(req,res,next)=>{
    House.find()
        .then(house=>{
            console.log(house)
            res.render('Landlord/edit-house',{
                prods:house,
                pageTitle:'User',
                path:'/edit-house'
            })
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getupdatehouse=(req,res,next)=> {
    const houseid = req.params.houseId
    House.findById(houseid)
        .then(house => {
            res.render('Landlord/update-house', {
                house: house,
                pageTitle: 'Details',
                path: '/Landlord/update-house'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postupdatehouse=(req,res,next)=>{
    const houseId=req.body.houseId;
    const updateHouseName=req.body.HouseName;
    const updateColony=req.body.Colony;
    const updateStreet=req.body.Street
    const updateCity=req.body.City
    const updateDistrict=req.body.District
    const updatePincode=req.body.Pincode
    const updatePrice=req.body.Price

    House.findById(houseId)
        .then(house=> {
            house.HouseName = updateHouseName;
            house.Colony = updateColony;
            house.Street = updateStreet
            house.City = updateCity
            house.District =updateDistrict
            house.Pincode = updatePincode
            house.Price = updatePrice
            return house.save();
        })
        .then(result=>{
            console.log('House Update ');
            res.redirect('/edit-house')
        })

        .catch(err=>{
            console.log(err)
        })
}

exports.postdeletehouse=(req,res,next)=>{
    const houseId=req.body.houseId;
    House.findByIdAndRemove(houseId)
        .then(()=>{
            console.log('Delete Product')
            res.redirect('/edit-house')
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getlandlordeditdetails=(req,res,next)=>{
    res.render('LandLord/landlord-editdetails',{
        pageTitle:'Edit Details',
        path:'/LandLord/landlord-editdetails'
    })
}
