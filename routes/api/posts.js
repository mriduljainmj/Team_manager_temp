const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check ,validationResult} = require('express-validator')
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');



router.post('/',[auth,[
    check('text',"Text is Required").not().isEmpty()
]],(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    User.findById(req.user.id).select('-password')
    .then((user)=>{

        const newPost = new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        })
        
        return newPost.save()
    })
    .then((post)=>{
        return res.json(post);
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).send('server error')   
    })


})


router.get('/',auth,(req,res,next)=>{
    Post.find().sort({date:-1})
    .then((posts)=>{
        return res.json(posts)
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).send('server error')   
    })
})



router.get('/:id',auth,(req,res,next)=>{
    Post.findById(req.params.id)
    .then((post)=>{
        if(!post){
            return res.json({err:"Post not found."})
        }
        return res.json(post)
    })
    .catch(err=>{
        if(err.kind === 'OnjectId'){
            return res.json({err:"Post not found."})
        }
        console.log(err.message)
        res.status(500).send('server error')   
    })
})


router.delete('/:id',auth,(req,res,next)=>{
    Post.findById(req.params.id)
    .then((post)=>{
        if(post.user.toString() !== req.user.id){
            return res.json({err:"User not Authorized"})
        }
            post.remove()
        return res.json({msg:"post removed"})
    })
    .catch(err=>{
        if(err.kind === 'OnjectId'){
            return res.json({err:"Post not found."})
        }
        console.log(err.message)
        res.status(500).send('server error')   
    })
})

    router.put('/like/:id',auth,(req,res,next)=>{
         Post.findById(req.params.id)
         .then((post)=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id).length>0){
                return res.status(400).json({msg:"Post already liked"})
            }
            post.likes.unshift({user:req.user.id});
            return post.save()
         })
         .then((post)=>{
             return res.json(post.likes)
         })
         .catch(err=>{
            if(err.kind === 'OnjectId'){
                return res.json({err:"Post not found."})
            }
            console.log(err.message)
            res.status(500).send('server error')   
        })
    })

    router.put('/unlike/:id',auth,(req,res,next)=>{
        Post.findById(req.params.id)
        .then((post)=>{
           if(post.likes.filter(like=>like.user.toString() === req.user.id).length===0){
               return res.status(400).json({msg:"Post not liked by the current user"})
           }
           const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
           post.likes.splice(removeIndex,1);
           return post.save()
        })
        .then((post)=>{
            return res.json(post.likes)
        })
        .catch(err=>{
           if(err.kind === 'OnjectId'){
               return res.json({err:"Post not found."})
           }
           console.log(err.message)
           res.status(500).send('server error')   
       })
   })


   router.post('/comment/:id',[auth,[
    check('text',"Text is Required").not().isEmpty()
]],(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    User.findById(req.user.id).select('-password')
    .then((user)=>{
        return Post.findById(req.params.id)
        .then((post)=>{
        
        const newComment = {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        }
        
        post.comments.unshift(newComment)

        return post.save()
    })
        })
    .then((post)=>{
        return res.json(post.comments);
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).send('server error')   
    })

})

router.delete('/comment/:id/:comment_id',auth,(req,res,next)=>{
    Post.findById(req.params.id)
    .then((post)=>{

       const comment =  post.comments.find(
            comment => comment.id === req.params.comment_id
        )
        
        if(!comment){
            return res.json({err:"Comment does not exists"})
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({err:"User not Authorized"})
        }

        const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
           post.comments.splice(removeIndex,1);
           return post.save()
    })
    .then((post)=>{
        console.log("comment deleted")
        return res.json(post.comments)
    })
    .catch(err=>{
        if(err.kind === 'OnjectId'){
            return res.json({err:"Post not found."})
        }
        console.log(err.message)
        res.status(500).send('server error')   
    })
})




module.exports = router;