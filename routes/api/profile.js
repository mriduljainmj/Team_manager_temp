const express = require('express');
const router = express.Router();
const {check ,validationResult} = require('express-validator')
const request = require('request')
const config = require('config')
const auth = require('../../middleware/auth');
// const fetch = require('node-fetch');
const Profile = require('../../models/Profile');
const User = require('../../models/User');





router.get('/me',auth,(req,res,next)=>{
    
    Profile.findOne({user:req.user.id})
    .populate('user',['name', 'avatar'])
    .then((profile)=>{
        if(!profile){
            return res.status(400).json({msg:'Profile does not exists'})
        }
         return res.json(profile)
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).send('server error')
    })


})



router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills are required').not().isEmpty()
]],(req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {}
    if(youtube)profileFields.social.youtube = youtube;
    if(twitter)profileFields.social.twitter = twitter;
    if(facebook)profileFields.social.facebook = facebook;
    if(linkedin)profileFields.social.linkedin = linkedin;  
    if(instagram)profileFields.social.instagram = instagram;
    

    Profile.findOne({user:req.user.id})
    .then((profile)=>{
        if(profile){
            return Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            .then(()=>{
                 return res.json(profile)
            })
            
        }

        profile = new Profile(profileFields);
            return profile.save()
        .then((profile)=>{
            return res.json(profile)
        })

    })
    .catch(err=>{
        console.log(err.message)
        res.status(500).send('server error')
    })
    
})


router.get('/',(req,res,next)=>{
    Profile.find().populate('user',['name','avatar'])
    .then((profiles)=>{
        return res.json(profiles)
    })
    .catch(err=>{
        console.log(err.message)
        res.status(500).send('server error')
    })
    
})


    router.get('/user/:user_id',(req,res,next)=>{
        Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])

        .then((profile)=>{
            if(!profile) {
                return res.status(400).json({msg:'There is no profile for this user.'})
            }
             return res.json(profile)
        })
        .catch(err=>{
            if(err.kind=='ObjectId'){
                return res.status(400).json({msg:'There is no profile for this user.'})
            }
            console.log(err.message)
            return res.status(500).send('server error')
        })
        
    })


    
    router.delete('/',auth,(req,res,next)=>{
        //also remove the posts from the user 
        Profile.findOneAndRemove({user:req.user.id})
        .then(()=>{
            return User.findOneAndRemove({_id:req.user.id})
            .then(()=>{
                return res.json({msg:'user deleted'})
            })

        })

        .catch(err=>{
            console.log(err.message)
            res.status(500).send('server error')
        })
        
    })


    router.put('/experience',[auth,[
        check('title','Title is required').not().isEmpty(),
        check('company','Company is required').not().isEmpty(),
        check('from','From Date is required').not().isEmpty()
    ]],(req,res,next)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()}) 
            }

            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body;

            
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            }

            Profile.findOne({user:req.user.id})
            .then((profile)=>{
                profile.experience.unshift(newExp);
                return profile.save();
            })
            .then((profile)=>{
                return res.json(profile)
            })

            .catch(err=>{
                console.log(err.message);
                res.status(500).send("server error") 
            })

    })

    router.delete('/experience/:exp_id',auth,(req,res,next)=>{
        Profile.findOne({user:req.user.id})
        .then((profile)=>{
            const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex,1);
             return profile.save()
        })
        .then((profile)=>{
            res.json(profile)
        })

        .catch(err=>{
            console.log(err.message);
            res.status(500).send("server error") 
        })
    })


    router.put('/education',[auth,[
        check('school','School is required').not().isEmpty(),
        check('degree','degree is required').not().isEmpty(),
        check('fieldOfstudy','Field Of Study is required').not().isEmpty(),
        check('from','From Date is required').not().isEmpty()
    ]],(req,res,next)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()}) 
            }

            const {
                school,
                degree,
                fieldOfstudy,
                from,
                to,
                current,
                description
            } = req.body;

            
            const newEdu = {
                school,
                degree,
                fieldOfstudy,
                from,
                to,
                current,
                description
            }

            Profile.findOne({user:req.user.id})
            .then((profile)=>{
                profile.education.unshift(newEdu);
                return profile.save();
            })
            .then((profile)=>{
                return res.json(profile)
            })

            .catch(err=>{
                console.log(err.message);
                res.status(500).send("server error") 
            })

    })

    router.delete('/education/:edu_id',auth,(req,res,next)=>{
        Profile.findOne({user:req.user.id})
        .then((profile)=>{
            const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.edu_id)
            profile.education.splice(removeIndex,1);
             return profile.save()
        })
        .then((profile)=>{
            res.json(profile)
        })

        .catch(err=>{
            console.log(err.message);
            res.status(500).send("server error") 
        })
    })


    router.get('/github/:username',(req,res,next)=>{

    try{
        const options= {
            uri:`https://api.github.com/users/${req.params.username}/repos?client_id=${config.get('githubCliendId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers: {'User-Agent':'node-js'}
        }


            request(options,(error,response,body)=>{
                if(error){
                  console.log(error);
                  return;
                }

                if(response.statusCode !== 200){
                    res.status(404).json({msg:'No Github profile found'})
                    return;
                }
               
                return res.json(JSON.parse(body)); 

            })
        }
        catch(err)
        {
                console.log(err.message);
                res.status(500).send("server error") 

        }
    })

    


module.exports = router;