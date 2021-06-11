exports.getLogin=(req,res,next)=>{
    res.render('/admin-login',{
        path:'/admin-login',
         pageTitle:'Login',
        isAuthenticated: false
    })
}
exports.getSignup=(req,res,next)=>{
    res.render('/admin-registartion',{
        path:'/admin-registration',
        pageTitle:'registration',
        isAuthenticated: false
    })
}

exports.postLogin=(req,res,next)=>{
   req.session.isLoggedIn=true
    res.redirect('/dashboard')

}
exports.postSignup=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const phoneno=req.body.phoneno;
    User.findOne({email:email})
        .then(userDoc=>{
            if(userDoc){
                return res.redirect('/admin-login')
            }
            const user=new User({
                username:username,
                email:email,
                password:password,
                phoneno:phoneno
            })
            return user.save();
        }).then(result=>{
            res.redirect('/admin-login')
    })
        .catch(err=>{
        console.log(err)
    })
}
exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err)
        res.redirect('/dashboard')
    })
}
