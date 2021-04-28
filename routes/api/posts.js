const express = require('express');
const router = express.Router();
 

router.get('/',(req,res,next)=>{
    res.send("get posts")
})


module.exports = router;