const crypto=require('crypto')


const bcrypt=require('bcryptjs')
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')
const {validationResult}=require('express-validator')

const User = require('../models/user')

const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{

       api_key: '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'
    }
}))

exports.getLogin=(req,res,next)=>{
    res.render('User/login',{
        path:'/User/login',
         pageTitle:'Login',
        isAuthenticated: false
    })
}
exports.getSignup=(req,res,next)=>{
    res.render('User/register',{
        path:'/User/register',
        pageTitle:'registration',
        isAuthenticated: false,
        oldInput:{
            username: "",
            email: "",
            password:"",
            confirmpassword: "",
            phoneno: ""

        }
    })
}

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.redirect('/register')
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
exports.postSignup=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const confirmpassword=req.body.confirmpassword;
    const phoneno=req.body.phoneno;
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).render('User/register',{
            path:'/User/register',
            pageTitle:'registration',
            isAuthenticated: false,
            oldInput:{username:username,email:email,password:password,confirmpassword:confirmpassword,phoneno:phoneno}
        })

    }
    User.findOne({email:email})
        .then(userDoc=>{
            if(userDoc){
                return res.redirect('/login')
            }
            return bcrypt.hash(password,12)
                .then(hashedPassword=>{
                const user=new User({
                    username:username,
                    email:email,
                    password:hashedPassword,
                    phoneno:phoneno
                })
                return user.save();

            })
        })

        .then(result=>{
            res.redirect('/user-form')
            return transporter.sendMail({
                to:email,
                from:'ayush.singhal_bca17@gla.ac.in',
                subject:'Signup Succedd',
                html:'<h1>You Sucessfully Signup</h1>'
            })

         

    }).catch(err=>{
        console.log(err)
    })

     .catch(err=>{
        console.log(err)
    })
}
exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err)
        res.redirect('/index')
    })
}
exports.getresetpassword=(req,res,next)=>{
/*
    let message=req.flash('error')
    if (message.length>0){
        message=message[0]
    }
    else{
        message=null
    }
  */  res.render('User/reset', {
        path: '/User/reset',
        pageTitle: 'Reset Password',
        isAuthenticated: false
    })
}

exports.postresetpassword=(req,res,next)=>{
crypto.randomBytes(32,(err, buf) => {
    if (err) {
        console.log(err)
        return res.redirect('/reset')
    }
    const token=buf.toString('hex')
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                //req.flash('error','No account with that email found ')
                return res.redirect('/reset')
            }
            user.resetToken=token
            user.resetTokenExpiration=Date.now()+360000
            return user.save
        })
        .then(result=>{
            res.redirect('/login')
            transporter.sendMail({
                to:req.body.email,
                from:'ayush.singhal_bca17@gla.ac.in',
                subject:'Password Re0set',
                html:`
                <p>You request a passowrd reset</p>
                <p>Click this <a href="http://localhost:3000/reset/${token}"> link</a> to reset the passord</p>
                      `
            })

        })
        .catch(err=>{
        console.log(err)
    })

})
}
exports.getnewpassword=(req,res,next)=>{
    const token=req.params.token
    User.findOne({resetToken: token, resetTokenExpiration:{$gt:Date.now()}})
        .then(user=>{
            res.render('User/newpassword', {
                path: '/User/newpassword',
                pageTitle: 'Reset Password',

                userid: user._id.toString(),
                passwordToken: token
            })
        })
        .catch(err=>{
        console.log(err)
    })

}

exports.postnewpassword=(req,res,next)=>{
    const newPassword=req.body.password
    const userid=req.body.userid
    const passwordToken=req.body.passwordToken
    let resetuser

    User.findOne({resetToken: token, resetTokenExpiration:{$gt:Date.now()}, _id:userid})
        .then(user=>{
            resetuser=user
            return bcrypt.hash(newPassword,12)
        })
        .then(hashedPassword=>{
            resetuser.password=hashedPassword
            resetuser.resetToken=undefined
            resetuser.resetTokenExpiration=undefined
            return resetuser.save()
        })
        .then(result=>{
            res.redirect('/login')
        })
        .catch(err=>{
            console.log(err)
        })

}