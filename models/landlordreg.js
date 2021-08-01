const mongoose=require('mongoose')
const Schema =mongoose.Schema

const landlordreg=new Schema({
    FirstName:{
        type:String,
        reqeuired:true
    },
    LastName:{
        type:String,
        reqeuired:true
    },
    Email:{
        type:String,
        reqeuired:true
    },
    password:{
        type:String,
        reqeuired:true
    },
    Telephone:{
        type:Number,
        reqeuired:true
    }
    }

)

module.exports = mongoose.model('landlordreg', landlordreg)