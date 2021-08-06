const express = require('express');
const { Collection } = require('mongoose');
const router = express.Router({ mergeParams: true});
const Post = require('../models/Post');

router.get('/',async(req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({ message: err});
    }
});




//Submit a post
router.post('/', (req, res) => {
    const post = new Post({
        name : req.body.name,
        genere : req.body.genere,
        description : req.body.description,
        caseandcrew : req.body.caseandcrew,
        availableforrent : req.body.availableforrent,
        rentCharge : req.body.rentCharge
    });
    post.save()
    .then(data => { 
        res.json(data);
    })
     .catch(err => {
         res.json({message:err});
        });
});

//Specific posts by name
 router.get('/moviename/:name', async(req, res) => {
    try{
         let PartialToMatch = new RegExp(req.params.name,'i');
         const posts = await Post.find({name :PartialToMatch});
         res.json(posts);
     } catch(err){
         res.json({ message: err});
     }
 });


 //Specific posts by page
 router.get('/page', async(req, res, next) => {
     let {page, size} = req.query;
     if(!page){
         page =1
     }
     if(!size){
         size =10
     }

    const limit = parseInt(size);
    const skip = (page-1) * size

      const posts = await Post.find().limit(limit).skip(skip);
      res.send(posts);

 });




//Specific posts by genere
router.get('/genere/:genere', async(req, res) => {
    try{
        const posts = await Post.find({genere : req.params.genere},{name :1});
        res.json(posts);
    } catch(err){
        res.json({ message: err});
    }
});

//Specific posts by postId
router.get('/id/:postId', async(req, res) => {
    try{
        const posts = await Post.findbyID({name :req.params.postId});
        res.json(posts);
    } catch(err){
        res.json({ message: err});
    }
});


router.get('/RentCheck/:name', async(req, res) => {
    try{
        const posts = await Post.find({name :req.params.name});
        if(posts[0].availableforrent == 'Yes'){
            res.json('Rent Charge :' + posts[0].rentCharge +' per day');
        }
    } catch(err){
        res.json({ message: err});
    }
});





module.exports = router;