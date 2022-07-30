const express = require('express')
const router = express.Router()
const User = require('../../models/user')

const bcrypt = require('bcryptjs')

const config = require('config')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')

router.post('/',(req,res)=>{
    const { email,password } = req.body

    if(!email||!password)
        return res.status(400).json({ msg : 'Enter all fields'})

    // check for existing user
    User.findOne({email})
    .then(user=>{
        if(!user) return res.status(400).json({ msg:'User does not exist' })


        // Validate password 
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'})
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
                            referralByCode : user.referralByCode,
                            points: user.points
                        }
                    })
                }
            )
        })
    })
})


router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>{
        res.json(user)
    })
})

module.exports = router