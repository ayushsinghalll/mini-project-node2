const mongoose=require('mongoose')

const Schema=mongoose.Schema

const userSchema=new Schema({

    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    anotherphone:{
        type:Number,
        required:true
    },
    GuardianName:{
        type:String,
        required:true
    },
    GuardianPhoneNo:{
        type:Number,
        required:true
    },
    GuardianAddress:{
        type:String,
        required:true
    },
    GuardianCity:{
        type:String,
        required:true
    },
    GuardianState:{
        type:String,
        required:true
    },
    GurardianZip:{
        type:String,
        required:true
    }

    /**
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }*/
})


module.exports = mongoose.model('UserForm', userSchema)

