const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Catagory = require('../models/Catagory')

router.get('/',(req, res, ) => {
    res.send('hi')
})

router
    .route('/:catagoryID')
    .get((req, res) => {
    
        res.send('get catagory '+req.params.catagoryID)
    })
    .put((req, res) => {
        res.send('update catagory '+req.params.catagoryID)
    })
    .delete((req, res) =>{
        res.send('delete catagory '+req.params.catagoryID)
    })


module.exports = router