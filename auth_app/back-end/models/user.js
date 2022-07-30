const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo: {
        type:String,
        required: true
    },
    referralCode: {
        type: String,
        required: true
    },
    referralByCode: {
        type: String,
        required: false
    },
    isAuth: {
        type: Boolean,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default:100
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
})


module.exports=mongoose.model('user',userSchema)