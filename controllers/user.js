const House = require('../models/landlord')
const UserForm=require('../models/userform')
const User=require('../models/user')
//const Stripe=require('stripe')('sk_test_51JETioSAy1lvmV50qa6MiYoDEPs3Pjng6ZpokPxt18ejFW5ZkOnQ8HemwRP6muWiMxSXfNQdqwJ1Bu3hSgraqWMT00hQovrmoN')
const dotenv =require('dotenv')

exports.getindex=(req,res,next)=>{
    res.render('User/index',{

               path:'/User/index'
    })
}
exports.getselectlogin=(req,res,next)=>{
    res.render('User/selectlogin',{
        pageTitle:'Select Login',
        path:'/User/selectlogin'
    })
}
exports.getuserform=(req,res,next)=>{
    res.render('User/user-form',{
        pageTitle:'User Form',
        path:'/User/user-form'
    })
}

exports.postuserform=(req,res,next)=>{
    const FirstName=req.body.FirstName
    const LastName=req.body.LastName
    const phoneno=req.body.phoneno
    const address=req.body.address
    const occupation=req.body.occupation
    const place=req.body.place
    const anotherphone=req.body.anotherphone
    const GuardianName=req.body.GuardianName
    const GuardianPhoneNo=req.body.GuardianPhoneNo
    const GuardianAddress=req.body.GuardianAddress
    const GuardianCity=req.body.GuardianCity
    const GuardianState=req.body.GuardianState
    const GurardianZip=req.body.GurardianZip
   

    const user =new UserForm({
        FirstName:FirstName,
        LastName:LastName,
        phoneno:phoneno,
        address:address,
        occupation:occupation,
        place: place,
        anotherphone: anotherphone,
        GuardianAddress: GuardianAddress,
        GuardianName: GuardianName,
        GuardianPhoneNo: GuardianPhoneNo,
        GuardianCity: GuardianCity,
        GuardianState: GuardianState,
        GurardianZip: GurardianZip,
        

        /*userId:req.user._id*/
    })
    user
        .save()
        .then(result=>{
            console.log("Form Submitted successfully")
            res.redirect('/login')

        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getuserindex=(req,res,next)=>{
    House.find()
        .then(house=>{
            console.log(house)
            res.render('User/user-index',{
            prods:house,
            pageTitle:'User',
            path:'/user-index'
        })
    })
        .catch(err=>{
            console.log(err)
        })
}

exports.geteditprofileuser=(req,res,next)=>{
    User.find()
        .then(user=>{
            console.log(user)
            res.render('User/editprofile-user',{

                pageTitle:'Edit Profile',
                path:'/User/editprofile-user'
            })

            }
        )
        .catch(er=>{
            console.log(er)
        })

}




exports.getuserdetails=(req,res,next)=>{
    const houseid=req.params.houseId
    House.findById(houseid)
        .then(house=>{
            res.render('User/user-details',{
                house:house,
                pageTitle:'Details',
                path:'/User/user-details'
            })
        })
        .catch(err=>{
            console.log(err)
        })

}
exports.posteditdetails=(req,res,next)=>{
    const updateFirstName=req.body.FirstName;
    const updateLasstName=req.body.LasstName;
    const updateTelephone=req.body.Telephone;

    const updateaddress=req.body.address
    const updateoccupation=req.body.occupation
    const updateplace=req.body.place
    const updateguardian=req.body.guardian
    const updategaddress=req.body.gaddress
    const updategTelephone=req.body.gTelephone

    User.findById(userId)
        .then(user=> {
            user.FirstName = updateFirstName;
            user.LasstName = updateLasstName;
            user.Telephone = updateTelephone
            user.address = updateaddress
            user.occupation =updateoccupation
            user.place = updateplace
            user.guardian = updateguardian
            user.gaddress =updategaddress
            user.gTelephone=updategTelephone
            return user.save();
        })
        .then(result=>{
            console.log('User Update ');
            res.redirect('/user-index')
        })

        .catch(err=>{
            console.log(err)
        })
}
/*
exports.getcheckout=(req,res,next)=>{
    return Stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:
             {
                name: "Ayush House",
                description: "It is a simple house",
                amount: 2000,
                currency: 'usd',

            }
       ,
        success_url:req.protocol+'://'+req.get('host')+ '/checkout/success',
        cancel_url:req.protocol+'://'+req.get('host')+ '/checkout/CANCEL'
    }).then(session=>{
        res.render('User/checkout',{
            pageTitle:'Checkout',
            path:'/User/checkout',
            sessionId:session.id
        })

    })
        .catch(err=>{
            console.log(err)
        })
    }
exports.getcheckoutsuccess=(req,res,next)=>{
res.redirect('/user-index')
}*/