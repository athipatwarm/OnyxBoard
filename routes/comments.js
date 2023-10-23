const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Comment = require('../models/Comment')

router.get('/',(req, res, ) => {
    res.send('hi')
})

router
    .route('/:commentID')
    .get((req, res) => {
    
        res.send('get comment '+req.params.commentID)
    })
    .put((req, res) => {
        res.send('update comment '+req.params.commentID)
    })
    .delete((req, res) =>{
        res.send('delete comment '+req.params.commentID)
    })


module.exports = router