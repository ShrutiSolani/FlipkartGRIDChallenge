require('dotenv').config()
const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../../models/user')

const bcrypt = require('bcryptjs')

const config = require('config')
const jwt = require('jsonwebtoken')


router.post('/',(req,res)=>{
    const { name,email,password, mobileNo, referralByCode } = req.body


    //Validation
    if(!name||!email||!password|| !mobileNo)
        return res.status(400).json({ msg : 'Enter all required fields'})
    
    User.findOne({email})
    .then(user =>{
        if(user) return res.status(400).json({ msg: 'User Exists' })
        const referralCode = Math.random().toString(36).substring(2, 8);
        const isAuth = false;
        const newUser = new User({
            name,
            email,
            password,
            mobileNo, 
            isAuth, 
            referralCode,
            referralByCode
        })

        

        // Create Salt and Hash
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err

                newUser.password = hash
                newUser.save()
                .then(user=>{

                    jwt.sign(
                        { id:user.id },
                        config.get('jwtSecret'),
                        { expiresIn:3600 },
                        (err,token) =>{
                            if (err) throw err

                            res.json({
                                token,  // token:token
                                user:{
                                    id:user.id,
                                    name:user.name,
                                    email:user.email,
                                    mobileNo: user.mobileNo,
                                    isAuth: user.isAuth,
                                    referralCode: user.referralCode,
                                    referralByCode: user.referralByCode,
                                    points: user.points
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})


router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({ message:err.message })
    }
})

function filterByEmail(item, target) {
    console.log(item.Contact);
    console.log("t " + target);
    if (item.Contact[0] === target) {
        console.log(item.Contact[0]);
      return true
    }
    return false;
  }
  
  


  router.get('/get-linkedin-data/:id', async(req, res) => {
    try{
        const user= await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json('Cannot find User')
        }
        email = user.email;
        console.log(email);
        const data = require('./../../WebScrapper/linkedinData.json');
        console.log(data);
        data.forEach(function (arrayItem) {
            if(arrayItem.Contact[0] === email){
                res.json(arrayItem);
            }
            // console.log(x);
        });
         //res.json('Cannot find data')
        // let userData = data.filter(filterByEmail(email))
        
    }catch(err){
        return res.status(500).json({ message:err.message })
    }
})


module.exports = router