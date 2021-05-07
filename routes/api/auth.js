const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check ,validationResult} = require('express-validator')


router.get('/',auth,(req,res)=>{

      User.findById(req.user.id).select('-password')
    .then((user)=>{
        return res.json(user)
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send("server error")
    })

})


router.post('/',[

    check('email','Enter a valid E-mail').isEmail(),
    check('password','Please enter the password').exists()

],(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    User.findOne({email})
    .then((user)=>{

        if(!user){
           return res.status(400).json({errors:[{msg:'User not not exists'}]}); 
            
        }
        bcrypt.compare(password,user.password)
        .then((des)=>{
            if(!des){
                return res.status(400).json({errors:[{msg:'Invalid Password'}]})
            }
            return user
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