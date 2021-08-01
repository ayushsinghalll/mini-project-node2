const bcrypt=require('bcryptjs')

const landlordreg=require('../models/landlordreg')

exports.getaddlandlord=(req,res,next)=>{
    res.render('admin/add-landlord',{

        path:'/admin/add-landlord'
    })
}
exports.postaddlandlord=(req,res,next)=>{
    const FirstName=req.body.FirstName;
    const LastName=req.body.LAstName;
    const Email=req.body.Email;
    const password=req.body.password;
    const TelephoneNo=req.body.TelephoneNo;
    landlordreg.findOne({Email:Email})
        .then(userDoc=>{
            if(userDoc){
                return res.redirect('/landlordlogin')
            }
            return bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    const user=new landlordreg({
                        FirstName:FirstName,
                        LastName:LastName,
                        Email:Email,
                        password:hashedPassword,
                        TelephoneNo:TelephoneNo
                    })
                    return user.save();
                })
        })

        .then(result=>{
            res.redirect('/landlordlogin')


        })

        .catch(err=>{
            console.log(err)
        })
}