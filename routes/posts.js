const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../db/models/postModel')

router.get('/',(req, res, ) => {
    res.send('hi')
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