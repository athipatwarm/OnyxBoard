const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Topic = require('../models/Topic')

router.get('/',(req, res, ) => {
    res.send('hi')
})

router
    .route('/:topicID')
    .get((req, res) => {
    
        res.send('get topic '+req.params.topicID)
    })
    .put((req, res) => {
        res.send('update topic '+req.params.topicID)
    })
    .delete((req, res) =>{
        res.send('delete topic '+req.params.topicID)
    })


module.exports = router