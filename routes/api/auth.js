const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')

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


module.exports = router;