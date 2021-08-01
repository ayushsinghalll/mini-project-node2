const mongoose=require('mongoose')

const Schema=mongoose.Schema

const landlordSchema=new Schema({

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
    IdType:{
        type:String,
        required:true
    },
    IdNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },

    oldpassword:{
        type:String

    },
    newpassword:{
        type:String
    },
    confirmpassword:{
        type:String
    }/*
     userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }*/
})


module.exports = mongoose.model('LandLordForm', landlordSchema)

