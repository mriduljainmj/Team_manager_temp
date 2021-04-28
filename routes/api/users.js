const express = require('express');
const router = express.Router();
const {check ,validationResult} = require('express-validator')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const User = require('../../models/User')

router.get('/',(req,res,next)=>{
    res.send("get users")
})

router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Not a valid E-mail').isEmail(),
    check('password','Please enter a valid password').isLength({min:6})
],(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password} = req.body;

    User.findOne({email})
    .then((user)=>{
        if(user){
           return res.status(400).json({errors:[{msg:'User already exists'}]}); 
            
        }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })
    
        return bcrypt.genSalt(10)
       .then((salt)=>{
           return bcrypt.hash(password,salt)
        })
        .then((hash)=>{
            const user = new User({
                name:name,
                email:email,
                avatar:avatar,
                password:hash
        })
            return user.save()
           })
        .then((user)=>{
            const payload = {
                user:{
                    id: user._id
                }
            }
            return jwt.sign(
                payload,
                config.get('jwtToken'),
                {expiresIn:36000},
                (err,token)=>{
                    if(err){
                        throw new err;
                    }
                    //  res.status(200).send("User Registered and token created")
                       return res.json({token})
                    }
                );

        })
        .catch(err=>console.log(err))

        
    })
        .catch(()=>{
            console.log(err.message);
            return res.status(500).send("server error")
        })
    })
    

module.exports = router;