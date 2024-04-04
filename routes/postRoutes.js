const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../db/models/postModel')
const User = require('../db/models/userModel')
const isAuth = require('../middleware/isAuth')

router.get('/',(req, res, ) => {
    res.send('hi')
})

router
    .route('create-post')
    .get(isAuth.authenticateToken, async(req,res)=>{
        if(req.user){
            const currentUser = await User.findById({_id: req.user})
            if(currentUser){
                res.render('createPost', {
                    user: currentUser.name,
                    id: currentUser._id
                }) 
            }
            
        } else {
                res.redirect('/')
        }

    })
    .post(async (req,res)=>{
        try {

        } catch(error) {

        }
    })


router
    .route('/:postID')
    .get((req, res) => {
    
        res.send('get post '+req.params.postID)
    })
    .put((req, res) => {
        res.send('update post '+req.params.postID)
    })
    .delete((req, res) =>{
        res.send('delete post '+req.params.postID)
    })


module.exports = router