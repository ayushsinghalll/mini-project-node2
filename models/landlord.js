const mongoose = require('mongoose')

const Schema=mongoose.Schema

const houseSchema= new Schema({
    HouseName: {
        type:String,
        required:true
    },
    Colony: {
        type:String,
        required:true
    },
    Street: {
        type:String,
        required:true
    },
    City: {
        type:String,
        required:true
    },
    District: {
        type:String,
        required:true
    },
    Pincode: {
        type:Number,
        required:true
    },
    Price: {
        type:Number,
        required:true
    },/*
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }*/

})

module.exports = mongoose.model("House",houseSchema)
